import * as vscode from 'vscode';
import axios from 'axios';
import { IncomingMessage } from 'http';

function sleep(ms) {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

export class CloudBuildLogContentProvider implements vscode.TextDocumentContentProvider {
	apiKey: string;
	onDidChangeEmitter = new vscode.EventEmitter<vscode.Uri>();
	onDidChange = this.onDidChangeEmitter.event;

	readers: { [uri: string]: CloudBuildLogContentReader } = {};

	constructor() {
		console.log("CloudBuildLogContentProvider constructor");
	}

	setApiKey(apiKey: string) {
		this.apiKey = apiKey;
	}

	provideTextDocumentContent(uri: vscode.Uri): string {
		if (this.apiKey === null || this.apiKey == "") {
			return "[Please set the apiKey setting in UnityCloudBuild-Viewer category]";
		}
		console.log("provideTextDocumentContent");
		let reader = this.getReaderOrCreateFor(uri);
		console.log("calling reader.getContent()");
		return reader.getContent();
	}

	getReaderOrCreateFor(uri: vscode.Uri) {
		console.log("getReaderOrCreateFor");
		const uriString = uri.toString();
		let reader: CloudBuildLogContentReader;
		if (this.readers[uriString] != null) {
			reader = this.readers[uriString];
		}
		else {
			reader = new CloudBuildLogContentReader(this.apiKey, uri, this.onDidChangeEmitter);
			this.readers[uriString] = reader;
		}
		return reader;
	}

	reload(uri: vscode.Uri) {
		var uriString = uri.toString();
		if (this.readers[uriString] != null) {
			const reader = this.readers[uriString];
			reader.stop();
			this.readers[uriString] = null;
		}
		// just notifying change will generate fresh reader.
		this.onDidChangeEmitter.fire(uri);
	}
}

export class CloudBuildLogContentReader {
	apiKey: string;
	uri: vscode.Uri;
	header: string = "";
	body: string = "";
	footer: string = "";
	bodyChanged: boolean = false;
	moreDataExist: boolean = false;
	loadEnd: boolean = false;
	loadError: Error;
	onDidChangeEmitter: vscode.EventEmitter<vscode.Uri>;
	stopRequested: boolean;

	public constructor(apiKey: string, uri: vscode.Uri, onDidChangeEmitter: vscode.EventEmitter<vscode.Uri>) {
		console.log("CloudBuildLogContentReader constructor start");
		this.apiKey = apiKey;
		this.uri = uri;
		this.onDidChangeEmitter = onDidChangeEmitter;
		this.readFileStreaming(uri);
		this.watchBodyChange(uri);
		console.log("CloudBuildLogContentReader constructor end");
	}

	public getContent() {
		console.log("provideTextDocumentContent called.");
		return this.getHeaderText() + "\n" + this.body + "\n" + this.getFooterText();
	}

	stop() {
		this.stopRequested = true;
	}

	async watchBodyChange(uri: vscode.Uri) {
		while (!this.stopRequested && !this.loadEnd) {
			await sleep(1000);
			console.log("checking bodyChanged");
			if (this.bodyChanged) {
				this.bodyChanged = false;
				console.log("checking bodyChanged: detected.");
				this.onDidChangeEmitter.fire(uri);
			}
		}
	}

	getHeaderText() {
		var header: string;
		if (this.loadEnd) {
			header = "[Load finished. URI: " + this.getDownloadUrl() + "]";
		} else {
			header = `[Loading... (${this.body.length} bytes) URI: ${this.getDownloadUrl()}]`;
		}
		if (this.moreDataExist) {
			header += "\n[WARNING: Not all data will be loaded this time.]"
		}
		return header;
	}

	getFooterText() {
		var footer: string;
		if (this.loadError != null) {
			footer = "[Load Error: " + this.loadError + "]";
		}
		else {
			if (this.loadEnd) {
				footer = "[Load End]";
			} else {
				footer = "[Loading...]";
			}
		}
		if (this.moreDataExist) {
			footer += "\n[WARNING: Not all data will be loaded this time.]"
		}
		return footer;
	}

	// strip the last part of path component.
	// because the last part is just for tab label name.
	getDownloadUrl() : string {
		var path = this.uri.path;
		const pos = path.lastIndexOf("/");
		return path.substring(0, pos);
	}

	async readFileStreaming(uri: vscode.Uri) {
		try {
			const url = this.getDownloadUrl();
			console.log("log download url:" + url);
			var response = await axios.get(url, {
				responseType: 'stream',
				headers: {
					'Authorization': 'Basic ' + this.apiKey
				}
			});
			console.log("response received. ", response.data);
			var message = response.data as IncomingMessage;
			if (message.headers["more-data"]) {
				this.moreDataExist = true;
			}
			message.on('data', (chunk: Buffer) => {
				if (this.stopRequested) return;
				// console.log("on data: " + chunk.length + "bytes");
				this.body += chunk;
				this.bodyChanged = true;
			});
			message.on('end', () => {
				if (this.stopRequested) return;
				// Output the content as a string
				console.log("on end", response);
				console.log(`complete: ${message.complete} aborted: ${message.aborted} more-data: ${message.headers["more-data"]}`);
				this.bodyChanged = false;
				this.loadEnd = true;
				this.onDidChangeEmitter.fire(uri);
			});
		}
		catch (error) {
			if (this.stopRequested) return;
			console.log(error);
			this.loadError = error;
			this.onDidChangeEmitter.fire(uri);
		}
	}
}
