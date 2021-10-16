import * as vscode from 'vscode';
import { ApiLoader, BuildInfo, BuildTargetInfo } from './apiloader';

export class BuildTreeDataProvider implements vscode.TreeDataProvider<BuildTreeItem | HeaderTreeItem> {
    apiLoader: ApiLoader;
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<BuildTreeItem | undefined | null | void> = new vscode.EventEmitter<BuildTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BuildTreeItem | undefined | null | void> = this.onDidChangeTreeDataEmitter.event;
    buildTargetFilter?: BuildTargetInfo;

    constructor(apiLoader: ApiLoader) {
        this.apiLoader = apiLoader;
    }

    refresh(): void {
        this.onDidChangeTreeDataEmitter.fire();
    }

    filterByConfig(buildTarget?: BuildTargetInfo): void
    {
        this.buildTargetFilter = buildTarget;
    }

    buildTargetIdForFilter(): string
    {
        if (this.buildTargetFilter == null) {
            return null;
        }
        return this.buildTargetFilter.buildTargetId;
    }

    currentFilterText(): string
    {
        if (this.buildTargetFilter == null) {
            return null;
        }
        return this.buildTargetFilter.name;
    }

    resetFilter(): void {
        this.buildTargetFilter = null;
    }

    getTreeItem(element: (BuildTreeItem|HeaderTreeItem)): vscode.TreeItem {
        return element;
    }

    getChildren(element?: (BuildTreeItem|HeaderTreeItem)): Thenable<(BuildTreeItem|HeaderTreeItem)[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            return this.getRootItems();
        }
    }

    getRootItems(): Thenable<(BuildTreeItem|HeaderTreeItem)[]>
    { 
        if (!this.apiLoader.isConfigured()) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            this.FetchBuildItems(resolve, reject);
        });
    }

    async FetchBuildItems(resolve: (value: (BuildTreeItem|HeaderTreeItem)[]) => void, reject) {
        try {
            const builds = await this.apiLoader.getBuilds(this.buildTargetIdForFilter());
            if (builds != null) {
                if (builds.length > 0) {
                    const buildItems = builds.map(i => new BuildTreeItem(i));
                    if (this.buildTargetIdForFilter() != null) {
                        // 結果がフィルタされている場合はヘッダ表示を追加
                        resolve([new HeaderTreeItem(`<< Filter: ${this.currentFilterText()} >>`, "filter"), ...buildItems]);
                    } else {
                        resolve(buildItems);
                    }
                }
                else {
                    resolve([new HeaderTreeItem("No builds found", null)]);
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
export class HeaderTreeItem extends vscode.TreeItem {
    constructor(label: string, contextValue: string
    ) {
        super(label, vscode.TreeItemCollapsibleState.None);
        this.contextValue = contextValue;
    }
}
