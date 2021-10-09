import * as vscode from 'vscode';
import { ApiLoader, BuildInfo } from './apiloader';

export class BuildTreeDataProvider implements vscode.TreeDataProvider<BuildTreeItem | NoBuildsTreeItem> {
    apiLoader: ApiLoader;
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<BuildTreeItem | undefined | null | void> = new vscode.EventEmitter<BuildTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BuildTreeItem | undefined | null | void> = this.onDidChangeTreeDataEmitter.event;

    constructor(apiLoader: ApiLoader) {
        this.apiLoader = apiLoader;
    }

    refresh(): void {
        this.onDidChangeTreeDataEmitter.fire();
    }

    getTreeItem(element: (BuildTreeItem|NoBuildsTreeItem)): vscode.TreeItem {
        return element;
    }

    getChildren(element?: (BuildTreeItem|NoBuildsTreeItem)): Thenable<(BuildTreeItem|NoBuildsTreeItem)[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            return this.getRootItems();
        }
    }

    getRootItems(): Thenable<(BuildTreeItem|NoBuildsTreeItem)[]>
    { 
        if (!this.apiLoader.isConfigured()) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            this.LoadBuilds(resolve, reject);
        });
    }

    async LoadBuilds(resolve: (value: (BuildTreeItem|NoBuildsTreeItem)[]) => void, reject) {
        try {
            const builds = await this.apiLoader.getBuilds();
            if (builds != null) {
                if (builds.length > 0) {
                const buildItems = builds.map(i => new BuildTreeItem(i));
                resolve(buildItems);
                }
                else {
                    resolve([new NoBuildsTreeItem()]);
                }
            }
            else {
                reject();
            }
        } catch(e) {
            reject(e);
        }
    }
}

// custom tree item for builds
export class BuildTreeItem extends vscode.TreeItem {
    logUrl: string;
    buildInfo: BuildInfo;
    constructor(
        buildInfo: BuildInfo
    ) {
        super(buildInfo.buildTargetName + " #" + buildInfo.build, vscode.TreeItemCollapsibleState.None);
        this.buildInfo = buildInfo;
        this.contextValue = "builditem";
        this.description = buildInfo.buildStatus;
    }
}

// no item for builds
export class NoBuildsTreeItem extends vscode.TreeItem {
    constructor(
    ) {
        super("No builds found", vscode.TreeItemCollapsibleState.None);
    }
}
