describe('AlwaysData Cron Job', () => {
	const ALWAYSDATA_USER = Cypress.env('ALWAYSDATA_USER');
	const ALWAYSDATA_PASS = Cypress.env('ALWAYSDATA_PASS');

	// Verificamos si estamos en CI antes de ejecutar el test
	before(() => {
		if (!process.env.CI) {
			// Si no estamos en CI, terminamos el test antes de ejecutarlo
			cy.log('Test skipped: Not in CI environment');
			return;
		}

		// Validamos que las variables de entorno estén definidas solo si estamos en CI
		if (!ALWAYSDATA_USER || !ALWAYSDATA_PASS) {
			throw new Error('Missing environment variables for login.');
		}
	});

	it('should perform login and logout', () => {
		// Si no estamos en CI, se salta el test
		if (!process.env.CI) {
			return; // Termina el test si no estamos en CI
		}

		// Si estamos en CI, ejecutamos el test
		cy.visit('https://admin.alwaysdata.com/login/');
		cy.url().should('contain', 'login');

		cy.get('#id_login').type(ALWAYSDATA_USER);
		cy.get('#id_password').type(ALWAYSDATA_PASS);

		cy.get('.btn[type=submit]').should('be.visible').click();

		cy.url().should('not.contain', 'login');

		cy.get('.user-login').click();

		cy.get('li.dropdown-logout:nth-child(7)').should('be.visible').click();
		cy.url().should('contain', 'login');
	});
});
