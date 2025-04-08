import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import fs from 'fs';

export function setupNodeEvents(on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) {
	// This is required for the preprocessor to be able to generate JSON reports after each run, and more,
	on('file:preprocessor', createBundler());
	on('before:browser:launch', (browser, launchOptions) => {
		//? About this Solution:
		//? When browser Chromium was executing test on demoqa, it was having performance issues with the ads before loading the page
		//? So we need to add the extension "AdBlock" to the browser Chrome, in order to avoid the ads and improve the performance.
		if (browser.family === 'chromium' && browser.name !== 'electron') {
			const pathToExtension = 'extension/adblock'; //? path to the extension AdBlock (already downloaded in the project)

			if (!fs.existsSync(pathToExtension)) throw new Error(`Cannot find extension at ${pathToExtension}`);

			launchOptions.args.push(`--disable-extensions-except=${pathToExtension}`);
			launchOptions.args.push(`--load-extension=${pathToExtension}`);

			if (process.env.CI) launchOptions.args.push('--headless=new');
			// eslint-disable-next-line no-console
			console.log('✅ AdBlock extension for chrome is loaded');
			// console.log(launchOptions.args); //? print all current args to check if the extension is being loaded

			return launchOptions;
		}
	});
	// Make sure to return the config object as it might have been modified by the plugin.
	return config;
}
