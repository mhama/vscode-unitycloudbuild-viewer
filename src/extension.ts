import * as vscode from 'vscode';
import OpenAPIClientAxios from 'openapi-client-axios';
// cloudbuildapi.d.ts was created by typegen (openapi-client-axios-typegen) with cloudbuildapi.json
import { Client as CloudBuildClient } from './cloudbuildapi';
import { CloudBuildLogContentProvider } from './logprovider';
import { ApiLoader, BuildTreeDataProvider, BuildTreeItem } from './treeprovider';

const cloudBuildLogScheme = "unitycloudbuildviewer";
const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	console.log("apikey: " + getApiKey());
	const api = new OpenAPIClientAxios(
		{
			definition: context.extensionPath + "/cloudbuildapi.json",
			axiosConfigDefaults: {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': 'Basic ' + getApiKey(),
				},
			},
			withServer: { url: 'https://build-api.cloud.unity3d.com/api/v1/', description: 'cloud build api server' }
		}
	);
		
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "unitycloudbuild-viewer" is now active!');

	const logProvider = new CloudBuildLogContentProvider();
	vscode.workspace.registerTextDocumentContentProvider(cloudBuildLogScheme, logProvider);

	const apiLoader = new ApiLoader(context.extensionPath + "/cloudbuildapi.json");
	const buildTreeDataProvider = new BuildTreeDataProvider(apiLoader);
	vscode.window.registerTreeDataProvider(
		'cloudbuildexplorer',
		buildTreeDataProvider,
	);
	vscode.commands.registerCommand('cloudbuildexplorer.refreshEntry', () =>
		buildTreeDataProvider.refresh()
  	);

	vscode.commands.registerCommand('cloudbuildexplorer.viewTextLog', async (build: BuildTreeItem) => {
		if (build.buildInfo.logUrl != null) {
			let uri = vscode.Uri.parse(cloudBuildLogScheme + ":" + build.buildInfo.logUrl + "/" + build.buildInfo.buildTargetId + "-" + build.buildInfo.build);
			logProvider.setApiKey(getApiKey());
			let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider
			await vscode.window.showTextDocument(doc, { preview: false });
		}
	});

  // The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('unitycloudbuild-viewer.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from UnityCloudBuildViewer!');
	});

	let disposable2 = vscode.commands.registerCommand('unitycloudbuild-viewer.listBuilds', async () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		/*
		const client = await api.init<CloudBuildClient>();
		const url = await readBuilds(client);
		let uri = vscode.Uri.parse(cloudBuildLogScheme + ":" + url);

		logProvider.setApiKey(getApiKey());
		let doc = await vscode.workspace.openTextDocument(uri); // calls back into the provider

		await vscode.window.showTextDocument(doc, { preview: false });
		*/
		vscode.window.showInformationMessage('List Builds from UnityCloudBuildViewer!');
	});

	let disposable3 = vscode.commands.registerCommand('unitycloudbuild-viewer.reload', () => {
		if (!vscode.window.activeTextEditor) {
			return;
		  }
		  let { document } = vscode.window.activeTextEditor;
		  if (document.uri.scheme !== cloudBuildLogScheme) {
			return;
		  }
		  logProvider.setApiKey(getApiKey());
		  logProvider.reload(document.uri);
		  vscode.window.showInformationMessage('Reload from UnityCloudBuildViewer!');
	});


	context.subscriptions.push(disposable, disposable2, disposable3);
}

// this method is called when your extension is deactivated
export function deactivate() {}

function getApiKey() : string
{
	return vscode.workspace.getConfiguration('unitycloudbuild-viewer')?.get("apiKey") ?? "";
}

async function readProjects(client: CloudBuildClient) {
    const res = await client.listProjectsForUser();
    //const res = await client.getBuilds({orgid: "psychicvrlab", projectid: "styly-vr-auto-build", buildtargetid: "_all"});
    console.log('projects', res.data);
}

/*
async function readBuilds(client: CloudBuildClient) {
    const res = await client.getBuilds({orgid: "psychicvrlab", projectid: "styly-vr-auto-build", buildtargetid: "_all"});
    console.log('builds: ', res.data);
    console.log('builds[0].links.log.href: ', res.data[0].links.log.href);
	return cloudBuildLogUrlBase + res.data[0].links.log.href;
}
*/
