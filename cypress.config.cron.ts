// cypress.config.cron.ts
import { defineConfig } from 'cypress';
import { cypressOptions } from './cypress/support/config/cypressOptions';
import { e2ePathsConfig } from './cypress/support/config/e2ePathsConfig';
import { envConfig } from './cypress/support/config/envConfig';
import { setupNodeEvents } from './cypress/support/config/setupNodeEvents';

const secrets = ['ALWAYSDATA_USER', 'ALWAYSDATA_PASS'];

// Cargar secretos
const envConfigLoaded = envConfig(secrets);

export default defineConfig({
	...cypressOptions,
	scrollBehavior: 'center',
	e2e: {
		...e2ePathsConfig,
		setupNodeEvents
	},
	env: envConfigLoaded
});
