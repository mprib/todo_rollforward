import { App, Editor, FileSystemAdapter, editorEditorField, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, Workspace } from 'obsidian';

// Remember to rename these classes and interfaces!
interface MyPluginSettings {
	mySetting: string;
	mySetting2: string
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	mySetting2: 'test'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;
	
	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	async onload() {
		await this.loadSettings();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

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
				console.log("Editor value", editor.getValue());
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


class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting Numero Uno')
			.setDesc('It\'s a secret')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Setting Numero DOS')
			.setDesc('Try this')
			.addText(text => text
				.setPlaceholder('Enter setting 2')
				.setValue(this.plugin.settings.mySetting2)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
