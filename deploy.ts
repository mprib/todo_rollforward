import * as fs from 'fs';
import * as path from 'path';

// Define plugin name
const pluginName: string = 'todo-rollforward'; // Replace with your actual plugin name

// Use USERPROFILE for Windows, fallback to HOME for other OS
const userHome: string = process.env.USERPROFILE || process.env.HOME || '';
const obsidianVaultPath: string = path.join(userHome, 'obsidian');
const destDir: string = path.join(obsidianVaultPath, '.obsidian', 'plugins', pluginName);
console.log('Destination directory:', destDir);

// Determine the source directory
let sourceDir: string = __dirname;
if (fs.existsSync(path.join(__dirname, 'dist', 'main.js'))) {
    sourceDir = path.join(__dirname, 'dist');
} else if (fs.existsSync(path.join(__dirname, 'build', 'main.js'))) {
    sourceDir = path.join(__dirname, 'build');
}

console.log('sourceDir identified as ', sourceDir)

// Define file paths
const sourceMainJs: string = path.join(sourceDir, 'main.js');
const destMainJs: string = path.join(destDir, 'main.js');
const sourceManifest: string = path.join(sourceDir, 'manifest.json');
const destManifest: string = path.join(destDir, 'manifest.json');

console.log(`  ${sourceMainJs} -> ${destMainJs}`);
console.log(`  ${sourceManifest} -> ${destManifest}`);

// Ensure the destination directory exists
fs.mkdirSync(destDir, { recursive: true });

// Copy main.js
fs.copyFileSync(sourceMainJs, destMainJs);

// Copy manifest.json
fs.copyFileSync(sourceManifest, destManifest);

console.log('Plugin files deployed successfully!');
console.log('Copied files:');