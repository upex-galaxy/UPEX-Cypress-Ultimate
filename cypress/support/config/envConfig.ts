// cypress/support/config/secrets.ts
import dotenv from 'dotenv';

// Cargar variables de entorno
dotenv.config();

export function getEnvVariable(name: string, required = true): string | undefined {
	const value = process.env[name];
	if (!value && required) {
		if (process.env.CI) {
			throw new Error(`MISSING CREDENTIAL: ${name}`);
		} else {
			console.warn(`WARNING: Missing local credential for ${name}`);
		}
	}
	return value;
}

export function envConfig(secrets: string[]): { [key: string]: string | undefined } {
	return secrets.reduce((acc: { [key: string]: string | undefined }, secret) => {
		acc[secret] = getEnvVariable(secret, false);
		return acc;
	}, {});
}
