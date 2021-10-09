import * as vscode from 'vscode';
import { CloudBuildLogContentProvider } from './logprovider';
import { BuildTreeDataProvider, BuildTreeItem, NoBuildsTreeItem } from './treeprovider';
import { ApiLoader, ProjectInfo } from './apiloader';
import { BuildDetailContentProvider } from './builddetailprovider';

const cloudBuildLogScheme = "unitycloudbuildviewer";
const cloudBuildDetailScheme = "unitycloudbuilddetail"
//const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "unitycloudbuild-viewer" is now active!');

	// setup Build Log Virtual Document
	const logProvider = new CloudBuildLogContentProvider(() => getApiKey());
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(cloudBuildLogScheme, logProvider));

	// setup Build Detail Virtual Document
	const buildDetailProvider = new BuildDetailContentProvider();
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(cloudBuildDetailScheme, buildDetailProvider));

	// setup Tree View
	const apiLoader = new ApiLoader(() => getApiKey(), context, context.extensionPath + "/cloudbuildapi.json");
	const buildTreeDataProvider = new BuildTreeDataProvider(apiLoader);
	const treeView = createTreeView(buildTreeDataProvider, buildDetailProvider);

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.refreshEntry', () =>
		buildTreeDataProvider.refresh()
  	));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.viewTextLog', async (build: BuildTreeItem) => {
		if (build.buildInfo.logUrl != null) {
			let uri = build.buildInfo.getLogTextUri();
			let doc = await vscode.workspace.openTextDocument(uri);
			await vscode.window.showTextDocument(doc, { preview: false });
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('unitycloudbuild-viewer.setup', async () => {
		if (getApiKey() == "") {
			var selection = await vscode.window.showErrorMessage("Before setup, please set the Api Key setting in the User Settings.", "Open Settings");
			if (selection == "Open Settings") {
				openSettings();
			}
			return;
		}
		// setup
		let projects: ProjectInfo[];
		try {
			projects = await apiLoader.readProjects();
		}
		catch(e) {
			console.error(e);
			vscode.window.showErrorMessage('Setup of UnityCloudBuildViewer failed! ApiKey setting may be wrong.');
			return;
		}
		const pickItems = projects.map(p => new (class implements vscode.QuickPickItem {
			label: string = `"${p.name}" project of "${p.orgName}" organization`;
			project: ProjectInfo = p;
		}));
		const result = await vscode.window.showQuickPick(pickItems, {
			placeHolder: 'Please select the target project',
		})
		if (result == null) {
			vscode.window.showInformationMessage('Setup of UnityCloudBuildViewer canceled.');
			return;
		}
		context.globalState["projectId"] = result.project.projectId;
		context.globalState["orgId"] = result.project.orgId;
		context.globalState.setKeysForSync(["projectId", "orgId"]);
		buildTreeDataProvider.refresh();
		//vscode.commands.executeCommand("onView:cloudbuildexplorer");
		vscode.window.showInformationMessage('Setup of UnityCloudBuildViewer completed!');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('unitycloudbuild-viewer.reload', () => {
		if (!vscode.window.activeTextEditor) {
			return;
		  }
		  let { document } = vscode.window.activeTextEditor;
		  if (document.uri.scheme !== cloudBuildLogScheme) {
			return;
		  }
		  logProvider.reload(document.uri);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('unitycloudbuilddetail.viewTextLog', async () => {
		let uri = buildDetailProvider.currentBuild.getLogTextUri();
		let doc = await vscode.workspace.openTextDocument(uri);
		await vscode.window.showTextDocument(doc, { preview: false });
	}));
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getApiKey() : string
{
	return vscode.workspace.getConfiguration('unitycloudbuild-viewer')?.get("apiKey") ?? "";
}

function createTreeView(buildTreeDataProvider: BuildTreeDataProvider, buildDetailProvider: BuildDetailContentProvider): vscode.TreeView<BuildTreeItem | NoBuildsTreeItem> {
	const treeView = vscode.window.createTreeView(
		'cloudbuildexplorer',
		{treeDataProvider: buildTreeDataProvider}
	);
	treeView.onDidChangeSelection( async (e) => {
		const treeItem = e.selection[0];
		if (!(treeItem instanceof BuildTreeItem)) {
			return;
		}
		const buildTreeItem = treeItem as BuildTreeItem;
		buildDetailProvider.setCurrentBuild(buildTreeItem.buildInfo);
		let uri = vscode.Uri.parse(cloudBuildDetailScheme + ":/Cloud Build Detail");
		let doc = await vscode.workspace.openTextDocument(uri);
		await vscode.window.showTextDocument(doc, { preview: false });
	});
	return treeView;
}

function openSettings()
{
	vscode.commands.executeCommand('workbench.action.openSettings', "Unity Cloud Build Viewer");
}