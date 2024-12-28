import { App, Editor, FileSystemAdapter, editorEditorField, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Workspace } from 'obsidian';

// Remember to rename these classes and interfaces!
interface ChecklistMigrationSettings {
	dailies_folder: string;
	date_format: string
}

const DEFAULT_SETTINGS: ChecklistMigrationSettings = {
	dailies_folder: 'dailies',
	date_format: 'YYYY-MM-DD'
}

export default class ChecklistMigration extends Plugin {
	settings: ChecklistMigrationSettings;
	
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new ChecklistMigrationSettingsTab(this.app, this));

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'insert-text',
			name: 'insert text',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log("Current Selection", editor.getSelection());
				console.log(this.app.workspace.getActiveFile())
				editor.replaceSelection('Welcome to your new text');
			}
		});

		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: 'get-all-text',
			name: 'Get All Text',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log("Current Selection", editor.getSelection());
				console.log("Active File: ", this.app.workspace.getActiveFile());
				console.log("Editor value:", editor.getValue());
			}
		});


		this.addCommand({
			id: 'print-vault-path',
			name: "Print Vault Path",
			editorCallback: (editor: Editor) => {
				let adapter = this.app.vault.adapter;
				let path = "";
				if (adapter instanceof FileSystemAdapter) {
    				path = adapter.getBasePath();
				} else {
		            path = "Unable to determine path: not a FileSystemAdapter";
				}
				console.log("Path to vault is: ", path);

			}

		})

	}

	onunload() {

	}

}


class ChecklistMigrationSettingsTab extends PluginSettingTab {
	plugin: ChecklistMigration;

	constructor(app: App, plugin: ChecklistMigration) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Dailies Folder')
			.setDesc('')
			.addText(text => text
				.setPlaceholder('Enter folder name')
				.setValue(this.plugin.settings.dailies_folder)
				.onChange(async (value) => {
					this.plugin.settings.dailies_folder = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Daily Note Date Format')
			.setDesc('')
			.addText(text => text
				.setPlaceholder('Enter format')
				.setValue(this.plugin.settings.date_format)
				.onChange(async (value) => {
					this.plugin.settings.date_format = value;
					await this.plugin.saveSettings();
				}));
	}
}
