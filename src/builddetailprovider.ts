import * as vscode from 'vscode';
import { BuildInfo } from './apiloader';

export class BuildDetailContentProvider implements vscode.TextDocumentContentProvider {
	uri: vscode.Uri;
    currentBuild: BuildInfo;
	onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
	onDidChange = this.onDidChangeEmitter.event;

	constructor() {
		console.log("CloudBuildLogContentProvider constructor");
	}

	provideTextDocumentContent(uri: vscode.Uri): string {
		this.uri = uri;
		return "Name: " + "`" + this.getBuildName() + "`" + "\n" + 
		"Status: " + this.currentBuild.buildStatus + "\n" +
		"Download: " + this.currentBuild.downloadUrl + "\n" +
		"Commit Id: " + this.currentBuild.commitId + "\n" +
		"Detail: " + this.currentBuild.detailText + "\n";
	}

	getBuildName() {
		return this.currentBuild.buildTargetId + " #" + this.currentBuild.build;
	}

	setCurrentBuild(build : BuildInfo) {
		this.currentBuild = build;
		this.onDidChangeEmitter.fire(this.uri);
	}
}
