import fs from 'fs';
import path from 'path';
import pc from "picocolors"
import { execSync } from 'child_process';

const REPO_NAME = 'js-frameworks-apps';

const DIST_DIR = path.join(import.meta.dirname, 'dist');
const ANGULAR_DIR = path.join(import.meta.dirname, 'angular-app');
const SVELTE_DIR = path.join(import.meta.dirname, 'svelte-app');

function runCommand(command, cwd) {
    console.log(`\n> Executing: "${command}" in folder [${path.basename(cwd)}]`);
    execSync(command, { stdio: 'inherit', cwd });
}

console.log('Starting project build...\n');

if (fs.existsSync(DIST_DIR)) {
    console.log('Delete old dist folder...');
    fs.rmSync(DIST_DIR, { recursive: true, force: true });
}
fs.mkdirSync(DIST_DIR);

try {
    console.log(pc.magentaBright('\n--- Angular building... ---'));
    runCommand('npm install', ANGULAR_DIR);
    runCommand(`npx ng build --configuration production --base-href "/${REPO_NAME}/angular/"`, ANGULAR_DIR);

    const angularDistOutput = path.join(ANGULAR_DIR, 'dist', 'angular-app', 'browser');
    fs.cpSync(angularDistOutput, path.join(DIST_DIR, 'angular'), { recursive: true });

    console.log(pc.yellowBright('\n--- SvelteKit building... ---'));
    runCommand('npm install', SVELTE_DIR);
    runCommand('npm run build', SVELTE_DIR);

    const svelteDistOutput = path.join(SVELTE_DIR, 'build');
    fs.cpSync(svelteDistOutput, path.join(DIST_DIR, 'svelte'), { recursive: true });

    console.log('\n--- Copying index.html ---');
    fs.copyFileSync(path.join(import.meta.dirname, 'index.html'), path.join(DIST_DIR, 'index.html'));

    console.log(pc.green('\nBuild completed.'));

} catch (error) {
    console.error(pc.red('\nBuild failed:', error.message));
    process.exit(1);
}