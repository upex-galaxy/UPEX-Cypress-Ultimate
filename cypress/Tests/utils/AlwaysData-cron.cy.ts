describe('AlwaysData Cron Job', () => {
	const ALWAYSDATA_USER = Cypress.env('ALWAYSDATA_USER');
	const ALWAYSDATA_PASS = Cypress.env('ALWAYSDATA_PASS');

	if (!ALWAYSDATA_USER || !ALWAYSDATA_PASS) {
		throw new Error('Missing environment variables for login.');
	}

	beforeEach(() => {
		cy.session('alwaysdata-session', () => {
			cy.visit('https://admin.alwaysdata.com/login/');
			cy.get('#id_login').type(ALWAYSDATA_USER);
			cy.get('#id_password').type(ALWAYSDATA_PASS);
			cy.get('.btn[type=submit]').click();
			cy.url().should('not.include', 'login');
		});
	});

	it('should perform login and logout', () => {
		cy.visit('https://admin.alwaysdata.com/');
		cy.get('.user-login').click();
		cy.get('li.dropdown-logout:nth-child(7)').should('be.visible').click();
		cy.url().should('include', 'login');
	});
});
