import { OrangeLoginPage } from '@utils/OrangeLogin.Page';
import { OrangeBuzzPage } from '@utils/OrangeBuzz.Page';

// * Este es el Commands cy.page() para usar los Page Object Models sin necesidad de importarlos en cada archivo de test.
// * Está comentado porque sirve de ejemplo para personalizarlo según las necesidades del proyecto.
export const pages = {
	loginPage: new OrangeLoginPage(),
	buzzPage: new OrangeBuzzPage()
};
