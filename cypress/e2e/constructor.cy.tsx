import cypress from 'cypress';

const constructor = '[data-cy="burgerConstructor"]';
const modal = '[data-cy="modal"]';
const modalClose = '[data-cy="modalClose"]';
const modalCloseOverlay = '[data-cy="modalCloseOverlay"]';
const orderButton = '[data-cy="order-button"]';
const orderNumber = '[data-cy="order-number"]';

beforeEach(() => {
  cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as(
    'getIngredients'
  );
  cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' }).as(
    'userLogIn'
  );
  cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
    'createOrder'
  );
  window.localStorage.setItem(
    'refreshToken',
    JSON.stringify('testRefreshToken')
  );
  cy.setCookie('accessToken', 'testToken');
  cy.visit('/');
  cy.viewport(1680, 1024);
  cy.wait('@getIngredients');
});

afterEach(() => {
  window.localStorage.clear();
  cy.clearCookies();
});

describe('Добавление ингредиента', () => {
    it('Добавляет булку и начинку', () => {
      cy.get(constructor).should('not.contain', 'ingredient-1');
      cy.get(constructor).should('not.contain', 'ingredient-2');
      cy.get('[data-cy="1"]').children('button').click();
      cy.get('[data-cy="2"]').children('button').click();
      cy.get(constructor).should('contain', 'ingredient-1');
      cy.get(constructor).should('contain', 'ingredient-2');
    });

  describe('Модальные окна', () => {
    it('Открытие модального окна', () => {
      cy.get(modal).should('not.exist');
      cy.get('[data-cy="1"]').click();
      cy.get(modal).should('be.visible');
      cy.get(modal).should('contain', 'ingredient-1'); 
    });
    it('Закрытие модального окна по крестику', () => {
      cy.get('[data-cy="2"]').click();
      cy.get(modal).should('be.visible');
      cy.get(modalClose).click();
      cy.get(modal).should('not.exist');
    });
    it('Закрытие модального окна по клику на оверлей', () => {
      cy.get('[data-cy="1"]').click();
      cy.get(modal).should('be.visible');
      cy.get(modalCloseOverlay).click({ force: true });
      cy.get(modal).should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('Создает заказ и проверяет, что конструктор пуст после закрытия модалки', () => {
      cy.get(constructor).should('not.contain', 'ingredient-1');
      cy.get(constructor).should('not.contain', 'ingredient-2');
      cy.get('[data-cy="1"]').children('button').click();
      cy.get('[data-cy="2"]').children('button').click();
      cy.get(constructor).should('contain', 'ingredient-1');
      cy.get(constructor).should('contain', 'ingredient-2');
      cy.get(orderButton).click();
      cy.get(modal).should('be.visible');
      cy.get(orderNumber).should('contain', '66530');
      cy.get(modalClose).click();
      cy.get(modal).should('not.exist');

      cy.get(constructor).should('exist');
      cy.get(constructor).should('not.contain', 'ingredient-1');
      cy.get(constructor).should('not.contain', 'ingredient-2');
    });
  });
});
