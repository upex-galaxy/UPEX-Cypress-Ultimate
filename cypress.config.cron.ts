import { defineConfig } from 'cypress';
import { envConfig } from './cypress/support/config/envConfig';
import { setupNodeEvents } from './cypress/support/config/setupNodeEvents';

const secrets = ['ALWAYSDATA_USER', 'ALWAYSDATA_PASS'];

// Cargar secretos
const envConfigLoaded = envConfig(secrets);

export default defineConfig({
	pageLoadTimeout: 20000,
	projectId: '2pw67q', //? ID del proyecto CYPRESS-DEMO-CLOUD
	viewportWidth: 1920,
	viewportHeight: 1080,
	downloadsFolder: 'cypress/downloads',
	videosFolder: 'cypress/videos',
	screenshotsFolder: 'cypress/screenshots',
	screenshotOnRunFailure: true,
	scrollBehavior: 'center',
	retries: process.env.CI ? 3 : 0,
	video: Boolean(process.env.CI),
	watchForFileChanges: false,
	chromeWebSecurity: false,
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'cypress.reporter.chrome.json'
	},
	e2e: {
		specPattern: ['cypress/Tests/**/*.cy.{js,jsx,ts,tsx}'],
		excludeSpecPattern: ['cypress/Tests/**/*.example.cy.{js,ts}', 'docs/**/*.*'],
		setupNodeEvents
	},
	env: envConfigLoaded
});
