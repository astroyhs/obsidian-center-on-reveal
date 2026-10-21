export interface CenterOnRevealSettings {
	/** Raw textarea content, one folder path per line. Empty means center everywhere. */
	excludedFolders: string;
}

export const DEFAULT_SETTINGS: CenterOnRevealSettings = {
	excludedFolders: '',
};

/** Normalize raw textarea input into clean vault-relative folder paths. */
export function parseExcludedFolders(raw: string): string[] {
	const seen = new Set<string>();
	for (const line of raw.split('\n')) {
		const folder = line
			.replace(/\\/g, '/')
			.trim()
			.replace(/^\/+|\/+$/g, '')
			.trim();
		if (folder && !seen.has(folder)) seen.add(folder);
	}
	return [...seen];
}

/** True when the file is at or under one of the excluded folders. */
export function isPathExcluded(filePath: string, excludedFolders: string[]): boolean {
	return excludedFolders.some((folder) => filePath === folder || filePath.startsWith(folder + '/'));
}
