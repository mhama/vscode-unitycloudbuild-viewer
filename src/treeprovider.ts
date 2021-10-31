import { hasUncaughtExceptionCaptureCallback } from 'process';
import * as vscode from 'vscode';
import { ApiLoader, BuildInfo, BuildTargetInfo } from './apiloader';

type TreeItem = BuildTreeItem | HeaderTreeItem;

export class BuildTreeDataProvider implements vscode.TreeDataProvider<TreeItem> {
    apiLoader: ApiLoader;
    private onDidChangeTreeDataEmitter: vscode.EventEmitter<BuildTreeItem | undefined | null | void> = new vscode.EventEmitter<BuildTreeItem | undefined | null | void>();
    readonly onDidChangeTreeData: vscode.Event<BuildTreeItem | undefined | null | void> = this.onDidChangeTreeDataEmitter.event;
    buildTargetFilter?: BuildTargetInfo;
    treeItems?: TreeItem[];

    itemsPerPage: number = 20;
    maxPages: number = 5;
    loadId: number = 0;

    constructor(apiLoader: ApiLoader) {
        this.apiLoader = apiLoader;
    }

    // load again from server and redraw
    reload(): void {
        this.treeItems = null;
        this.onDidChangeTreeDataEmitter.fire();
    }

    // draw again without changing contents
    redraw(): void {
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

    getTreeItem(element: TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: TreeItem): Thenable<TreeItem[]> {
        if (element) {
            return Promise.resolve([]);
        } else {
            return this.getRootItems();
        }
    }

    getRootItems(): Thenable<TreeItem[]>
    { 
        if (!this.apiLoader.isConfigured()) {
            return Promise.resolve([]);
        }
        return new Promise((resolve, reject) => {
            this.FetchRootItems(resolve, reject);
        });
    }

    // ビルドアイテムを取得する非同期メソッド。
    // ロード済みの場合はそのまま返す。
    // コンテンツ未ロードの場合はサーバーから取得して１ページ目を返す。
    // １ページ目をロードしたとき、２ページ目以降のロードも仕掛けて、ロードされ次第再描画する。
    async FetchRootItems(resolve: (value: TreeItem[]) => void, reject) {
        if (this.treeItems != null) {
            resolve(this.treeItems);
            return;
        }
        try {
            if (this.buildTargetIdForFilter() != null) {
                var builds = await this.FetchFilteredBuildItems();
                this.treeItems = builds;
                resolve(builds);
            }
            else {
                const onPage: ((loadId: number, page: number, builds: TreeItem[]) => void) = (loadId, page, builds) => {
                    // 古い指示に対する結果は不要のため破棄する
                    if (loadId != this.loadId) {
                        return;
                    }
                    if (this.treeItems != null) {
                        this.treeItems.push(...builds);
                        this.redraw();
                    }
                };
                this.loadId++;
                var builds = await this.FetchAllBuildItems(this.loadId, this.itemsPerPage);
                // 値の返却後も次ページをロードする（完了を待たない。onPageが順次呼ばれる）
                this.FetchAllBuildPagesAsync(this.loadId, 2, this.itemsPerPage, onPage);
                this.treeItems = builds;
                resolve(builds);
            }
        }
        catch(e) {
            reject(e);
        }
    }

    // fetch all build items
    // 全ビルドの１ページ目取得に加え、実行中のビルド (buildStatus = started) も平行して取得し、必ず表示する。
    // 長時間実行中のビルドが１ページ目に入らないことがあることの対策。
    async FetchAllBuildItems(loadId: number, itemsPerPage: number)
        : Promise<TreeItem[]>
    {
        const [allBuilds, startedBuilds] = await Promise.all([this.apiLoader.getBuilds(null, null, 1, itemsPerPage), this.apiLoader.getBuilds(null, "started")]);
        if (allBuilds == null || startedBuilds == null) {
            throw new Error("getBuilds return null.");
        }
        if (allBuilds.length == 0 && startedBuilds.length == 0) {
            return [new HeaderTreeItem("No builds found", null)];
        }
        const startedBuildItems = startedBuilds.map(i => new BuildTreeItem(i));
        // startedのものは除外することで二重表示しないようにする
        const allBuildItems = allBuilds.map(i => (i.buildStatus != "started") ? new BuildTreeItem(i) : null);

        return [...startedBuildItems, ...allBuildItems];
    }

    // ２ページ目以降をロードする
    // ロードが進むたびにonPageが呼ばれる
    async FetchAllBuildPagesAsync(loadId: number, page: number, itemsPerPage: number, onPage: (loadId: number, page: number, builds: TreeItem[]) => void) {
        for (var i=2 ; i<=this.maxPages ; i++) {
            const builds = await this.FetchAllBuildPageAsync(i, itemsPerPage);
            onPage(loadId, page, builds);
            if (builds.length == 0) {
                break;
            }
        }
    }

    // 次ページ取得
    async FetchAllBuildPageAsync(page: number, itemsPerPage: number) : Promise<TreeItem[]> {
        const allBuilds = await this.apiLoader.getBuilds(null, null, page, itemsPerPage);
        if (allBuilds == null) {
            throw new Error("getBuilds return null.");
        }
        if (allBuilds.length == 0) {
            return [];
        }
        // startedのものは除外することで二重表示しないようにする
        const allBuildItems = allBuilds.map(i => (i.buildStatus != "started") ? new BuildTreeItem(i) : null);

        return allBuildItems;
    }

    async FetchFilteredBuildItems() : Promise<TreeItem[]> {
        const builds = await this.apiLoader.getBuilds(this.buildTargetIdForFilter());
        if (builds != null) {
            if (builds.length > 0) {
                const buildItems = builds.map(i => new BuildTreeItem(i));
                // 結果がフィルタされている場合はヘッダ表示を追加
                return [new HeaderTreeItem(`<< Filter: ${this.currentFilterText()} >>`, "filter"), ...buildItems];
            }
            else {
                return [new HeaderTreeItem(`<< Filter: ${this.currentFilterText()} >>`, "filter"), new HeaderTreeItem("No builds found", null)];
            }
        }
        else {
            throw new Error("getBuilds return null.");
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
