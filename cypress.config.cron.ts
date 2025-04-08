// cypress.config.cron.ts
import { defineConfig } from 'cypress';
import { cypressOptions } from './cypress/support/config/cypressOptions';
import { e2ePathsConfig } from './cypress/support/config/e2ePathsConfig';
import { envConfig } from './cypress/support/config/envConfig';

import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import path, { dirname } from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Definir __dirname manualmente al usar ESM
/* eslint-disable @typescript-eslint/naming-convention */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
/* eslint-enable @typescript-eslint/naming-convention */

const secrets = ['ALWAYSDATA_USER', 'ALWAYSDATA_PASS'];

// Cargar secretos
const envConfigLoaded = envConfig(secrets);

export default defineConfig({
	...cypressOptions,
	scrollBehavior: 'center',
	e2e: {
		...e2ePathsConfig,
		setupNodeEvents(on, config) {
			// Esto es necesario para que el preprocesador pueda generar informes JSON después de cada ejecución, y más
			on('file:preprocessor', createBundler());

			on('before:browser:launch', (browser, launchOptions) => {
				//? Sobre esta solución:
				//? Cuando el navegador Chromium estaba ejecutando pruebas en demoqa, tenía problemas de rendimiento con los anuncios antes de cargar la página
				//? Por lo tanto, necesitamos añadir la extensión "AdBlock" al navegador Chrome, para evitar los anuncios y mejorar el rendimiento.
				if (browser.family === 'chromium' && browser.name !== 'electron') {
					// Ruta de la extensión AdBlock (ya descargada en el proyecto)
					const pathToExtension = path.resolve(__dirname, 'extension/adblock');

					// Verificar que la extensión exista en la ruta especificada
					if (!fs.existsSync(pathToExtension)) {
						throw new Error(`Cannot find extension at ${pathToExtension}`);
					}

					// Añadir la extensión al navegador con los parámetros adecuados
					launchOptions.args.push(`--disable-extensions-except=${pathToExtension}`);
					launchOptions.args.push(`--load-extension=${pathToExtension}`);

					// Si estamos en CI, añadir el modo sin cabeza (headless)
					if (process.env.CI) launchOptions.args.push('--headless=new');

					// Mostrar mensaje en la consola indicando que la extensión se cargó
					// eslint-disable-next-line no-console
					console.log('✅ AdBlock extension for chrome is loaded');

					// console.log(launchOptions.args); //? print all current args to check if the extension is being loaded
					return launchOptions;
				}
			});

			// Asegúrate de devolver el objeto de configuración, ya que podría haberse modificado por el plugin.
			return config;
		}
	},
	env: envConfigLoaded
});
