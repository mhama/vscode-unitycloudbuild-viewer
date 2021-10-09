import * as vscode from 'vscode';
import OpenAPIClientAxios from 'openapi-client-axios';
import { Client as CloudBuildClient, Paths } from './cloudbuildapi';

const cloudBuildLogUrlBase = "https://build-api.cloud.unity3d.com";
const cloudBuildLogScheme = "unitycloudbuildviewer";

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
        const orgId = this.context.globalState["orgId"];
        const projectId = this.context.globalState["projectId"];
        if (orgId == null || projectId == null) {
            return false;
        }
        return true;
    }

    async getBuilds(): Promise<BuildInfo[]>
    {
        this.checkApiKey();
        const orgId = this.context.globalState["orgId"];
        const projectId = this.context.globalState["projectId"];
        console.log("orgId: " + orgId + " projectId: " + projectId);
        if (orgId == null || projectId == null) {
            throw new Error("UnityCloudBuild Viewer Not configured correctly. Please run setup.");
        }
        const client = await this.api.init<CloudBuildClient>();
        const res = await client.getBuilds({orgid: orgId, projectid: projectId, buildtargetid: "_all", per_page: 30});
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
}

export class ProjectInfo
{
    name: string;
    projectId: string;
    orgName: string;
    orgId: string;
    projectDetail: any;
    constructor(project: any) {
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
    detailText: string;
    buildStatus: string;

    constructor(build: any) {
        console.log("creating BuildInfo.", build);
        this.build = build.build;
        this.buildTargetId = build.buildtargetid;
        this.buildTargetName = build.buildTargetName;
        const logLink = build.links?.log?.href;
        this.downloadUrl = build.links?.download_primary?.href ?? "";
        this.logUrl = (logLink != null) ? (cloudBuildLogUrlBase + logLink) : "";
        this.buildStatus = build.buildStatus;
        this.detailText = JSON.stringify(build, null, 2);
    }

    getLogTextUri(): vscode.Uri {
        const uri = vscode.Uri.parse(cloudBuildLogScheme + ":" + this.logUrl + "/" + this.buildTargetId + "-" + this.build);
        return uri;
    }
}

