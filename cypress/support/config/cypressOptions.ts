export const cypressOptions = {
	//: Partial<Cypress.ConfigOptions> = {
	pageLoadTimeout: 20000,
	// @Ely: CYPRESS DASHBOARD PARA VER NUESTRAS EJECUCIONES EN LA WEB:
	projectId: '2pw67q', //? ID del proyecto CYPRESS-DEMO-CLOUD. Record Key para usar: "b6bde345-a36c-4fab-ad8c-cddc065d2cba"
	// @Ely: Link para ver el proyecto Cloud: https://cloud.cypress.io/projects/2pw67q/analytics/runs-over-time
	// 1280×720 is considered to be the most suitable screen resolution for the desktop website version:
	viewportWidth: 1920,
	viewportHeight: 1080,
	downloadsFolder: 'cypress/downloads',
	videosFolder: 'cypress/videos',
	screenshotsFolder: 'cypress/screenshots',
	screenshotOnRunFailure: true,
	scrollBehavior: 'center',
	// Number of times to retry a failed test. If a number is set, tests will retry in both runMode and openMode:
	retries: process.env.CI ? 3 : 0,
	// Whether Cypress will record a video of the test run when running on headless:
	video: Boolean(process.env.CI),
	// Whether Cypress will watch and restart tests on test file changes:
	watchForFileChanges: false,
	// En Caso de hacer testing en SUT con seguridad web:
	chromeWebSecurity: false,
	// multi-reporters: one report.xml + mochawesome.json per file.
	reporter: 'cypress-multi-reporters',
	reporterOptions: {
		configFile: 'cypress.reporter.chrome.json'
	}
};
