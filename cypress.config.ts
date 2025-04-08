// cypress.config.ts
import { defineConfig } from 'cypress';
import { cypressOptions } from './cypress/support/config/cypressOptions';
import { e2ePathsConfig } from './cypress/support/config/e2ePathsConfig';
import { envConfig } from './cypress/support/config/envConfig';
import { setupNodeEvents } from './cypress/support/config/setupNodeEvents';

const secrets = ['ORANGE_USERNAME', 'ORANGE_PASSWORD', 'TRELLO_KEY', 'TRELLO_TOKEN', 'LITE_CART_DB_USER', 'LITE_CART_DB_PASS', 'LITE_CART_CLIENT_USERNAME', 'LITE_CART_CLIENT_PASS'];

// Cargar secretos para el entorno normal
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
