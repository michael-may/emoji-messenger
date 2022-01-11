'use strict';

/**
 * NPM Modules
 */
const fs = require('fs').promises,
	path = require('path'),
	colors = require('colors');

async function main() {
	const packageJson = await fs.readFile(path.normalize('package.json'), 'utf8').catch(err => {
		console.error('Failed to load/parse package.json'.bold.red);
		process.exit();
	});

	let version = packageJson.match(/\"version\":.*\"(.*?)\",/);

	if (version[1]) {
		version = version[1];
	} else {
		console.error('Error determining package version'.bold.red);
		process.exit();
	}

	console.log('Adding version number to index.html.');
	let index = await fs.readFile(path.normalize('src/index.html'), 'utf8').catch(err => {
		console.error('Failed to load/parse index.html'.bold.red);
		process.exit();
	});

	index = index.replace(/(.*?window.appVersion.*?\')(.*?)(\'\;.*)/, `$1${version}$3`);

	await fs.writeFile(path.normalize('src/index.html'), index).catch(err => {
		console.error('Could not save index.html edits.'.bold.red);
		process.exit(0);
	});
}

main();
