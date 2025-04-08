// cypress.config.cron.ts
import { defineConfig } from 'cypress';
import { cypressOptions } from 'cypress/support/config/cypressOptions';
import { envConfig } from 'cypress/support/config/envConfig';
import { setupNodeEvents } from 'cypress/support/config/setupNodeEvents';

const secrets = ['ALWAYSDATA_USER', 'ALWAYSDATA_PASS'];

// Cargar secretos
const envConfigLoaded = envConfig(secrets);

export default defineConfig({
	...cypressOptions,
	scrollBehavior: 'center',
	e2e: {
		// baseUrl: 'https://demoqa.com',
		// Glob pattern to determine what test files to load:
		specPattern: ['cypress/Tests/**/*.cy.{js,jsx,ts,tsx}'],
		excludeSpecPattern: ['cypress/Tests/**/*.example.cy.{js,ts}', 'docs/**/*.*'],
		setupNodeEvents
	},
	env: envConfigLoaded
});
