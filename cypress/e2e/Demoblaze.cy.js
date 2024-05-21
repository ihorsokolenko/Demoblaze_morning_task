/// <reference types='cypress' />
const { faker } = require('@faker-js/faker');

describe('Demoblaze', () => {
  let user;

  beforeEach(() => {
    cy.visit('https://www.demoblaze.com/');
    cy.task('generateUser').then((generateUser) => {
      user = generateUser;
    });
  });
  it('should register the user', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user.username, { force: true });
    cy.get('#sign-password').type(user.password, { force: true });
    cy.contains('.btn', 'Sign up').click();
    cy.wait(1000);
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Sign up successful.');
    });
  });
  it('should login the user with registered credentials', () => {
    cy.get('#signin2').click();
    cy.get('#sign-username').type(user.username, { force: true });
    cy.get('#sign-password').type(user.password, { force: true });
    cy.contains('.btn', 'Sign up').click();
    cy.get('a').contains('Log in').click();
    cy.get('#loginusername').type(user.username, { force: true });
    cy.get('#loginpassword').type(user.password, { force: true });
    cy.contains('.btn', 'Log in').click();
    cy.get('a').should('contain', `Welcome ${user.username}`);
  });
  it('should provide an ability to choose a product', () => {
    cy.get('.list-group-item').contains('Phones').click();
    cy.get('.card-title').contains('Samsung galaxy s6').click();
    cy.get('.btn').contains('Add to cart').click();
    cy.on('window:alert', (alert) => {
      expect(alert).to.eq('Product added');
    });
  });
});
