import { Plugin, PluginSettingTab, Setting, type App } from 'obsidian';
import { CenterOnRevealController } from './center-on-reveal';
import {
	type CenterOnRevealSettings,
	DEFAULT_SETTINGS,
	isPathExcluded,
	parseExcludedFolders,
} from './settings';

export class CenterOnRevealSettingTab extends PluginSettingTab {
	constructor(
		app: App,
		private plugin: CenterOnRevealPlugin,
	) {
		super(app, plugin);
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		new Setting(containerEl)
			.setName('Excluded folders')
			.setDesc(
				'One folder path per line, for example daily. Files under these folders keep the default reveal.',
			)
			.addTextArea((text) =>
				text
					.setPlaceholder('Notes/daily\narchive/2024')
					.setValue(this.plugin.settings.excludedFolders)
					.onChange(async (value) => {
						this.plugin.settings.excludedFolders = value;
						await this.plugin.saveSettings();
					}),
			);
	}
}

export default class CenterOnRevealPlugin extends Plugin {
	settings!: CenterOnRevealSettings;
	private controller!: CenterOnRevealController;
	private unloaded = false;

	async onload(): Promise<void> {
		await this.loadSettings();
		this.controller = new CenterOnRevealController(this.app, undefined, (filePath) =>
			isPathExcluded(filePath, parseExcludedFolders(this.settings.excludedFolders)),
		);

		this.addSettingTab(new CenterOnRevealSettingTab(this.app, this));

		this.app.workspace.onLayoutReady(() => {
			if (this.unloaded) return;
			void this.controller.start();
		});

		this.registerEvent(this.app.workspace.on('file-open', () => this.controller.centerSoon()));
	}

	onunload(): void {
		this.unloaded = true;
		this.controller.clear();
	}

	async loadSettings(): Promise<void> {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			(await this.loadData()) as Partial<CenterOnRevealSettings>,
		);
	}

	async saveSettings(): Promise<void> {
		await this.saveData(this.settings);
	}
}
