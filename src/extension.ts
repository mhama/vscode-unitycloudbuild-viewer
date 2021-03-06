import * as vscode from 'vscode';
import { CloudBuildLogContentProvider } from './logprovider';
import { BuildTreeDataProvider, BuildTreeItem, HeaderTreeItem } from './treeprovider';
import { ApiLoader, BuildTargetInfo, ProjectInfo } from './apiloader';
import { BuildDetailContentProvider } from './builddetailprovider';

const cloudBuildLogScheme = "unitycloudbuildviewer";
const cloudBuildDetailScheme = "unitycloudbuilddetail"
//const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";

var treeRedrawTimer: NodeJS.Timer = null;

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "unitycloudbuild-viewer" is now active!');

	// setup Build Log Virtual Document
	const logProvider = new CloudBuildLogContentProvider(() => getApiKey());
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(cloudBuildLogScheme, logProvider));

	// API loader
	const apiLoader = new ApiLoader(() => getApiKey(), context, context.extensionPath + "/cloudbuildapi.json");

	// setup Build Detail Virtual Document
	const buildDetailProvider = new BuildDetailContentProvider(apiLoader);
	context.subscriptions.push(vscode.workspace.registerTextDocumentContentProvider(cloudBuildDetailScheme, buildDetailProvider));

	// setup Tree View
	const buildTreeDataProvider = new BuildTreeDataProvider(apiLoader);
	const treeView = createTreeView(buildTreeDataProvider, buildDetailProvider);

	// load Build Configs (speedup filter selection)
	if (apiLoader.isConfigured()) {
		apiLoader.getBuildTargetsCached(false);
	}

	// redraw tree view (update time information)
	treeRedrawTimer = setInterval(() => {
		console.log("interval redraw");
		buildTreeDataProvider.redraw();
	}, 30000);

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.refreshEntry', () =>
		buildTreeDataProvider.reload()
	));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.clearFilter', () => {
		buildTreeDataProvider.resetFilter();
		buildTreeDataProvider.reload();
	}));


	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.filterBuilds', async () => {
		processBuildFilter(apiLoader, buildTreeDataProvider);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.viewTextLog', async (build: BuildTreeItem) => {
		if (build.buildInfo.logUrl != null) {
			let uri = build.buildInfo.getLogTextUri();
			let doc = await vscode.workspace.openTextDocument(uri);
			await vscode.window.showTextDocument(doc, { preview: false });
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.buildAgain', async (build: BuildTreeItem) => {
		try {
			var result = await apiLoader.startBuild(build.buildInfo.buildTargetId);
			if (result.error == null) {
				buildTreeDataProvider.reload();
			}
			else
			{
				vscode.window.showErrorMessage(`Failed building '${build.buildInfo.buildTargetId}'. error: ${result.error}`);
			}
		}
		catch(e) {
			vscode.window.showErrorMessage(`Failed building '${build.buildInfo.buildTargetId}'. error: ${e}`);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.cancelBuild', async (build: BuildTreeItem) => {
		try {
			var result = await apiLoader.cancelBuild(build.buildInfo.buildTargetId, build.buildInfo.build);
			buildTreeDataProvider.reload();
		}
		catch(e) {
			vscode.window.showErrorMessage(`Failed canceling '${build.buildInfo.buildTargetId} #${build.buildInfo.build}'. error: ${e}`);
		}
	}));

	context.subscriptions.push(vscode.commands.registerCommand('cloudbuildexplorer.createShare', async (build: BuildTreeItem) => {
		if (build.buildInfo.buildStatus != "success") {
			vscode.window.showErrorMessage(`Create Share Link is available for successful builds only.`);
			return;
		}
		try {
			console.log("createShareUrl:" + build.buildInfo.createShareUrl);
			await apiLoader.createShare(build.buildInfo.createShareUrl);
			buildTreeDataProvider.redraw();
		}
		catch(e) {
			vscode.window.showErrorMessage(`Failed building '${build.buildInfo.buildTargetId}'. error: ${e}`);
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
		await context.globalState.update("projectId", result.project.projectId);
		await context.globalState.update("orgId", result.project.orgId);
		buildTreeDataProvider.reload();
		apiLoader.getBuildTargetsCached(false);
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
export function deactivate() {
	clearInterval(treeRedrawTimer);
	treeRedrawTimer = null;
}

function getApiKey() : string
{
	return vscode.workspace.getConfiguration('unitycloudbuild-viewer')?.get("apiKey") ?? "";
}

function createTreeView(buildTreeDataProvider: BuildTreeDataProvider, buildDetailProvider: BuildDetailContentProvider): vscode.TreeView<BuildTreeItem | HeaderTreeItem> {
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

// show configs selector and apply filter to tree view
async function processBuildFilter(apiLoader: ApiLoader, buildTreeDataProvider: BuildTreeDataProvider)
{
	class BuildTargetPickItem implements vscode.QuickPickItem {
		label: string;
		buildTarget: BuildTargetInfo;
		constructor(buildTarget: BuildTargetInfo) {
			this.label = buildTarget.name;
			this.buildTarget = buildTarget;
		}
	}

	class ReloadPickItem implements vscode.QuickPickItem {
		label: string;
		constructor() {
			this.label = "Reload Configs...";
		}
	}

	const buildTargets = await getBuildTargetsWithProgress(apiLoader, false);
	const sortedBuildTargets = buildTargets.sort((a,b) =>  (a.name > b.name ? 1 : -1));
	var pickItems : (BuildTargetPickItem|ReloadPickItem)[] = sortedBuildTargets.map(i => new BuildTargetPickItem(i));
	pickItems.unshift(new ReloadPickItem());
	const options = new class implements vscode.QuickPickOptions {
		canPickMany: boolean;
		title: string;
		placeHolder: string;
		constructor() {
			this.canPickMany = false;
			this.title = "Please select a config to filter builds.";
			this.placeHolder = "Filter by config name...";
		}
	};
	const selected = await vscode.window.showQuickPick(pickItems, options);
	if (selected == null) {
		return;
	}
	if (selected instanceof ReloadPickItem) {
		await getBuildTargetsWithProgress(apiLoader, true);
		vscode.commands.executeCommand('cloudbuildexplorer.filterBuilds');
		return;
	}
	buildTreeDataProvider.filterByConfig((selected as BuildTargetPickItem).buildTarget);
	buildTreeDataProvider.reload();
	vscode.window.showInformationMessage('picked filter:' + selected.label);
}

async function getBuildTargetsWithProgress(apiLoader: ApiLoader, reload: boolean): Promise<BuildTargetInfo[]>
{
	return await vscode.window.withProgress<BuildTargetInfo[]>({
		location: vscode.ProgressLocation.Notification,
		cancellable: false,
		title: 'Loading CloudBuild configs...'
	}, async (progress) => {
		let buildTargetInfo: BuildTargetInfo[];
		progress.report({ increment: 0 });
		buildTargetInfo = await apiLoader.getBuildTargetsCached(reload);
		progress.report({ increment: 100 });
		return buildTargetInfo;
	});
}
