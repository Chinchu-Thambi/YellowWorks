import Auth from '@aws-amplify/auth';

Auth.configure({
  region: Cypress.env('GATSBY_AWS_REGION'),
  userPoolId: Cypress.env('GATSBY_COGNITO_USER_POOL_ID'),
  userPoolWebClientId: Cypress.env('GATSBY_COGNITO_POOL_CLIENT_ID'),
});

describe.skip('onboarding free profile', () => {
  before(async () => {
    cy.clearLocalStorageSnapshot();

    const username = Cypress.env('CYPRESS_TEST_USER');
    const password = Cypress.env('CYPRESS_TEST_PASSWORD');
    await Auth.signIn(username, password);
    cy.saveLocalStorage();
  });

  beforeEach(() => {
    cy.restoreLocalStorage();

    cy.server({ method: 'POST' });
    cy.route(Cypress.env('GATSBY_PRODUCT_PLATFORM_ENDPOINT'), 'fx:responses/onboarding.freeProfile');
  });

  afterEach(() => {
    cy.saveLocalStorage();
  });

  it('finds welcome message', () => {
    cy.visit('/my-yellow/onboarding/example-uuid');

    cy.contains('Welcome to Yellow!');
    cy.findByRole('button', { name: 'close' })
      .click();
  });

  it('completes step 1', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/1');

    cy.findByRole('textbox', { name: 'What’s your Business Trading Name?' })
      .clear()
      .type('My Cypress Business');

    cy.findByRole('textbox', { name: 'Tell your customers about your business' })
      .clear()
      .type('This description was set by a cypress test.');

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });

  it('completes step 2', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/2');

    // we will not test google autocomplete api, just that the address form is responsive.
    cy.findByRole('textbox', { name: /unit/i })
      .clear()
      .type(777);

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });

  it('completes step 3', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/3');

    // we will not test google autocomplete api, just that the address form is responsive.
    cy.findByRole('radio', { name: /yes/i })
      .click({
      // because it's covered by a span, but still accessible.
        force: true,
      });

    cy.findByRole('radio', { name: 'All New Zealand 18 regions' })
      .click({
        // maybe we need to review the radio implementation.
        force: true,
      });

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });

  it('completes step 4', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/4');

    cy.findByRole('combobox', { name: /area code/i })
      .select('09');

    cy.findByRole('textbox', { name: /phone number/i })
      .clear()
      .type('7777777');

    cy.findByRole('textbox', { name: /business email address/i })
      .clear()
      .type('cypress.business@example.com');

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });

  it('completes step 5', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/5');

    cy.findByText('Select...')
      .click();

    cy.findByText('Builders')
      .click();

    cy.findByText('Cleaners - Commercial')
      .findByRole('button', { name: /remove/i })
      .click();

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });

  it('completes step 6', () => {
    cy.url().should('be', '/my-yellow/onboarding/example-uuid/6');

    cy.findByRole('checkbox', { name: /skip this step for now/i })
      .click();

    cy.findByRole('button', { name: /next/i })
      .click({ force: true });
  });
});
