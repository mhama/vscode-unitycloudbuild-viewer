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

	getDurationStringFromSec(sec : number) : string {
		if (sec == null) {
			return "";
		}
		return `${Math.floor(sec / 60)}min ${Math.floor(sec) % 60}sec`;
	}

	provideTextDocumentContent(uri: vscode.Uri): string {
		this.uri = uri;
		return "Name: " + "`" + this.getBuildName() + "`" + "\n" + 
		"Status: " + this.currentBuild.buildStatus + "\n" +
		"Download: " + this.currentBuild.downloadUrl + "\n" +
		"Branch: " + this.currentBuild.scmBranch + "\n" +
		"Commit Id: " + this.currentBuild.commitId + "\n" +
		this.buildTimeText() + "\n" +
		"\n" +
		"Detail: " + this.currentBuild.detailText + "\n";
	}

	buildTimeText() : string {
		if (this.currentBuild.buildStatus == "started") {
			return "Building For: " + this.getDurationStringFromSec(this.currentBuild.getCurrentBuildSec());
		}
		return "Build Time: " + this.getDurationStringFromSec(this.currentBuild.totalTimeInSeconds);
	}

	getBuildName() {
		return this.currentBuild.buildTargetId + " #" + this.currentBuild.build;
	}

	setCurrentBuild(build : BuildInfo) {
		this.currentBuild = build;
		this.onDidChangeEmitter.fire(this.uri);
	}
}
