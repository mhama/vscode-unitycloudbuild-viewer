import * as vscode from 'vscode';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client as CloudBuildClient } from './cloudbuildapi';

const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";

export class BuildTreeDataProvider implements vscode.TreeDataProvider<BuildTreeItem> {
    apiLoader: ApiLoader;
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<BuildTreeItem | undefined | null | void> = new vscode.EventEmitter<BuildTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BuildTreeItem | undefined | null | void> = this.onDidChangeTreeDataEmitter.event;

    constructor(apiLoader: ApiLoader) {
        this.apiLoader = apiLoader;
    }

    refresh(): void {
        this.onDidChangeTreeDataEmitter.fire();
    }

    getTreeItem(element: BuildTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: BuildTreeItem): Thenable<BuildTreeItem[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            return this.getRootItems();
        }
    }

    getRootItems(): Thenable<BuildTreeItem[]>
    {
        return new Promise((resolve, reject) => {
            this.LoadBuilds(resolve, reject);
        });
    }

    async LoadBuilds(resolve: (value: BuildTreeItem[]) => void, reject) {
        try {
            const builds = await this.apiLoader.getBuilds();
            if (builds != null) {
                const buildItems = builds.map(i => new BuildTreeItem(i, vscode.TreeItemCollapsibleState.Collapsed));
                resolve(buildItems);
            }
            else {
                reject();
            }
        } catch(e) {
            reject(e);
        }
    }
}

export class ApiLoader
{
    api: OpenAPIClientAxios;

    constructor(definitionFilePath: string) {
        this.api = new OpenAPIClientAxios(
            {
                definition: definitionFilePath,
                axiosConfigDefaults: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + this.getApiKey(),
                    },
                },
                withServer: { url: 'https://build-api.cloud.unity3d.com/api/v1/', description: 'cloud build api server' }
            }
        );
		
    }

    getApiKey(): string {
        return vscode.workspace.getConfiguration('unitycloudbuild-viewer')?.get("apiKey") ?? "";
    }

    async getBuilds(): Promise<BuildInfo[]>
    {
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.getBuilds({orgid: "psychicvrlab", projectid: "styly-vr-auto-build", buildtargetid: "_all"});
        const builds = res.data.slice(0, 20);
        const buildInfos = builds.map(i => new BuildInfo(i));
        return buildInfos;
    }
}

// simple data model
class BuildInfo
{
    build?: number;
    buildTargetId?: string;
    buildTargetName?: string;
    logUrl?: string;

    constructor(build: any) {
        console.log("creating BuildInfo.", build);
        this.build = build.build;
        this.buildTargetId = build.buildtargetid;
        this.buildTargetName = build.buildTargetName;
        const logLink = build.links?.log?.href;
        this.logUrl = (logLink != null) ? (cloudBuildLogUrlBase + logLink) : "";
    }
}

// custom tree item for builds
export class BuildTreeItem extends vscode.TreeItem {
    logUrl: string;
    buildInfo: BuildInfo;
    constructor(
        buildInfo: BuildInfo,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(buildInfo.buildTargetName + " #" + buildInfo.build, collapsibleState);
        this.buildInfo = buildInfo;
        this.contextValue = "builditem";
    }
}
