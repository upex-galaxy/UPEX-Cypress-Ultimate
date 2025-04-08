describe('AlwaysData Cron Job', () => {
	const ALWAYSDATA_USER = Cypress.env('ALWAYSDATA_USER');
	const ALWAYSDATA_PASS = Cypress.env('ALWAYSDATA_PASS');

	// Validamos que las variables de entorno estén definidas
	if (!ALWAYSDATA_USER || !ALWAYSDATA_PASS) {
		throw new Error('Missing environment variables for login.');
	}

	it('should perform login and logout', () => {
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
