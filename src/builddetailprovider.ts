import { createCipheriv } from 'crypto';
import * as vscode from 'vscode';
import { ApiLoader, BuildInfo, BuildTargetDetailInfo } from './apiloader';

const shareLinkUrlBase = "https://developer.cloud.unity3d.com/share/share.html?shareId=";

export class BuildDetailContentProvider implements vscode.TextDocumentContentProvider {
	uri: vscode.Uri;
    currentBuild: BuildInfo;
	onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
	onDidChange = this.onDidChangeEmitter.event;
	apiLoader: ApiLoader;
	shareLink: string;
	buildTargetDetail: BuildTargetDetailInfo;

	constructor(apiLoader: ApiLoader) {
		this.apiLoader = apiLoader;
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
		this.shareLinkText() + "\n" +
		"\n" +
		"Detail: " + this.currentBuild.detailText + "\n" +
		"Config: " + this.buildTargetDetail?.detailText + "\n";
	}

	buildTimeText() : string {
		if (this.currentBuild.buildStatus == "started") {
			return "Building For: " + this.getDurationStringFromSec(this.currentBuild.getCurrentBuildSec());
		}
		return "Build Time: " + this.getDurationStringFromSec(this.currentBuild.totalTimeInSeconds);
	}

	shareLinkText() : string {
		if (this.shareLink == null) {
			return "Share Link: ";
		}
		return "Share Link: " + "`" + this.getBuildName() + "` " + shareLinkUrlBase + this.shareLink;
	}

	getBuildName() {
		return this.currentBuild.buildTargetId + " #" + this.currentBuild.build;
	}

	setCurrentBuild(build : BuildInfo) {
		this.currentBuild = build;
		this.shareLink = null;
		this.buildTargetDetail = null;
		this.onDidChangeEmitter.fire(this.uri);
		this.ShareLinkGetter(build); // 非同期メソッドだが待たない。
		this.BuildTargetDetailGetter(build);
	}

	async ShareLinkGetter(build : BuildInfo) {
		// share link is not needed for failed or running builds
		if (build.buildStatus != "success") {
			return;
		}
		try {
			var share = await this.apiLoader.getShare(build.buildTargetId, build.build);
		}
		catch(e) {
			console.log("ShareLinkGetter error: ", e);
			return;
		}
		// APIのレスポンスを待っている間に表示対象ビルドが変わっていることがあるので、その場合は捨てる。
		if (this.currentBuild.buildTargetId != build.buildTargetId || this.currentBuild.build != build.build) {
			return;
		}
		this.shareLink = share.shareId;
		this.onDidChangeEmitter.fire(this.uri);
	}

	async BuildTargetDetailGetter(build : BuildInfo) {
		try {
			var buildTargetDetail = await this.apiLoader.getBuildTargetDetail(build.buildTargetId);
		}
		catch(e) {
			console.log("BuildTargetDetailGetter error: ", e);
			return;
		}
		// APIのレスポンスを待っている間に表示対象ビルドが変わっていることがあるので、その場合は捨てる。
		if (this.currentBuild.buildTargetId != build.buildTargetId || this.currentBuild.build != build.build) {
			return;
		}
		this.buildTargetDetail = buildTargetDetail
		this.onDidChangeEmitter.fire(this.uri);
	}
}
