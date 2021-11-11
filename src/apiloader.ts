import * as vscode from 'vscode';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client as CloudBuildClient, Paths } from './cloudbuildapi';

const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";
const cloudBuildLogScheme = "unitycloudbuildviewer";

type GetBuildsResponseItemType = Paths.GetBuilds.Responses.$200[0];
type GetBuildTargetsResponseItemType = Paths.GetBuildTargets.Responses.$200[0];
type GetListProjectsForUserResponseItemType = Paths.ListProjectsForUser.Responses.$200[0];

export class ApiLoader
{
    context: vscode.ExtensionContext;
    definitionFilePath: string;
	apiKeyProvider: () => string;

    api: OpenAPIClientAxios;
    currentApiKey: string;

    constructor(apiKeyProvider: () => string, context: vscode.ExtensionContext, definitionFilePath: string) {
        this.definitionFilePath = definitionFilePath;
        this.context = context;
        this.apiKeyProvider = apiKeyProvider;
        this.checkApiKey();
    }

    checkApiKey() {
        const apiKey = this.apiKeyProvider();
        if (apiKey != this.currentApiKey) {
            this.currentApiKey = apiKey;
            this.recreateApi();
        }
    }

    getOrgAndProjectParams() : {[name: string] :string} {
        const orgId: string = this.context.globalState.get("orgId");
        const projectId: string = this.context.globalState.get("projectId");
        console.log("orgId: " + orgId + " projectId: " + projectId);
        if (orgId == null || projectId == null) {
            throw new Error("UnityCloudBuild Viewer Not configured correctly. Please run setup.");
        }
        return {orgid: orgId, projectid: projectId};
    }

    recreateApi() {
        if (this.currentApiKey == "") {
            this.api = null;
            return;
        }
        this.api = new OpenAPIClientAxios(
            {
                definition: this.definitionFilePath,
                axiosConfigDefaults: {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Basic ' + this.currentApiKey,
                    },
                },
                withServer: { url: 'https://build-api.cloud.unity3d.com/api/v1/', description: 'cloud build api server' }
            }
        );
    }

    isConfigured(): boolean {
        this.checkApiKey();
        if (this.currentApiKey == "") {
            return false;
        }
        const orgId: string = this.context.globalState.get("orgId");
        const projectId: string = this.context.globalState.get("projectId");
        if (orgId == null || projectId == null) {
            return false;
        }
        return true;
    }

    async getBuilds(buildTargetId?: string, buildStatus?: string, page?: number, perPage?: number): Promise<BuildInfo[]>
    {
        this.checkApiKey();
        const orgAndProject = this.getOrgAndProjectParams();
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.getBuilds({...orgAndProject, 
            buildtargetid: (buildTargetId ?? "_all"), 
            buildStatus: buildStatus,
            page: page ?? 1,
            per_page: perPage ?? 30});
        const builds = res.data;
        const buildInfos = builds.map(i => new BuildInfo(i));
        return buildInfos;
    }

    async readProjects() : Promise<ProjectInfo[]> {
        this.checkApiKey();
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.listProjectsForUser();
        console.log('projects', res.data);
        return res.data.map(p => new ProjectInfo(p));
    }

    async startBuild(buildTargetId: string) {
        this.checkApiKey();
        const orgAndProject = this.getOrgAndProjectParams();
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.startBuilds({...orgAndProject, buildtargetid: buildTargetId})
        console.log('startBuild result:', res.data);
        console.log('startBuild status:', res.data[0].buildStatus);
        return res.data[0];
    }

    async getBuildTargets() : Promise<BuildTargetInfo[]> {
        this.checkApiKey();
        const orgAndProject = this.getOrgAndProjectParams();
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.getBuildTargets({...orgAndProject})
        console.log('getBuildTargets result:', res.data);
        return res.data.map(p => new BuildTargetInfo(p));
    }
}

export class ProjectInfo
{
    name: string;
    projectId: string;
    orgName: string;
    orgId: string;
    projectDetail: any;

    constructor(project: GetListProjectsForUserResponseItemType) {
        this.name = project.name;
        this.projectId = project.projectid;
        this.orgName = project.orgName;
        this.orgId = project.orgid;
        this.projectDetail = project;
    }
}

// simple data model
export class BuildInfo
{
    build?: number;
    buildTargetId?: string;
    buildTargetName?: string;
    logUrl?: string;
    downloadUrl?: string;
    buildStatus: string;
    commitId?: string;
    scmBranch?: string;
    detailText: string;
    totalTimeInSeconds?: number;
    buildStartTime?: Date;
    checkoutStartTime?: Date;
    finishedTime?: Date;
    createdTime?: Date;

    constructor(build: GetBuildsResponseItemType) {
        console.log("creating BuildInfo.", build);
        this.build = build.build;
        this.buildTargetId = build.buildtargetid;
        this.buildTargetName = build.buildTargetName;
        const logLink = build.links?.log?.href;
        this.downloadUrl = build.links?.download_primary?.href ?? "";
        this.logUrl = (logLink != null) ? (cloudBuildLogUrlBase + logLink) : "";
        this.buildStatus = build.buildStatus;
        this.commitId = build.lastBuiltRevision;
        this.scmBranch = build.scmBranch;
        this.detailText = JSON.stringify(build, null, 2);
        this.totalTimeInSeconds = build.totalTimeInSeconds;
        this.buildStartTime = (build.buildStartTime != null) ? new Date(build.buildStartTime) : null;
        this.checkoutStartTime = (build.checkoutStartTime != null) ? new Date(build.checkoutStartTime) : null;
        this.finishedTime = (build.finished != null) ? new Date(build.finished) : null;
        this.createdTime = (build.created != null) ? new Date(build.created) : null;
    }

    getLogTextUri(): vscode.Uri {
        const uri = vscode.Uri.parse(cloudBuildLogScheme + ":" + this.logUrl + "/" + this.buildTargetId + "-" + this.build);
        return uri;
    }

    getCurrentBuildSec(): number {
        if (this.buildStatus != "started") {
            return null;
        }
        if (this.checkoutStartTime == null) {
            return null;
        }
        var sec = Math.floor((Date.now() - this.checkoutStartTime.getTime()) / 1000);
        return sec;
    }
}

export class BuildTargetInfo
{
    buildTargetId: string;
    name: string;
    platform?: string;
    detailText: string;

    constructor(buildtarget: GetBuildTargetsResponseItemType) {
        console.log("creating BuildTargetInfo.", buildtarget);
        this.buildTargetId = buildtarget.buildtargetid;
        this.name = buildtarget.name;
        this.platform = buildtarget.platform;
        this.detailText = JSON.stringify(buildtarget, null, 2);
    }
}
