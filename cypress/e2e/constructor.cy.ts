const BUN_SELECTOR = '[data-cy="643d69a5c3f7b9001cfa093c"]';
const INGREDIENT_SELECTOR = '[data-cy="643d69a5c3f7b9001cfa0941"]';
const MODAL_CLOSE_SELECTOR = '[data-cy="modal-close"]';

describe('Burger Constructor', () => {
    beforeEach(() => {
        cy.intercept('GET', '/api/ingredients', {
          fixture: 'ingredients.json'
        });
        cy.visit('/');
    });

    it('should add a bun an ingredient to the constructor', () => {
        cy.get(BUN_SELECTOR).contains('Добавить').click().as('addBun');
        cy.get('.constructor-element').contains('Краторная булка N-200i').should('exist');

        cy.get(INGREDIENT_SELECTOR).contains('Добавить').click().as('addIngredient');
        cy.get('.constructor-element').contains('Биокотлета из марсианской Магнолии').should('exist');
    })
    
    it('should open and close ingredient modal', () => {
        cy.get(INGREDIENT_SELECTOR).click().as('openIngredient');
        cy.get(MODAL_CLOSE_SELECTOR).click();
    })

    it('should open and close ingredient overlay', () => {
        cy.get(INGREDIENT_SELECTOR).click().as('openIngredient');
        cy.get('[data-cy="overlay"]').click({force: true}); 
    })

    it('should open and close ingredient esc', () => {
        cy.get(INGREDIENT_SELECTOR).click().as('openIngredient');
        cy.get('body').type('{esc}');
    })
})

describe('Order Creation', () => {
    beforeEach(() => {
        localStorage.setItem('refreshToken', 'fakeRefreshToken');
        cy.setCookie('accessToken', 'fakeAccessToken');
    
        cy.intercept('GET', '/api/ingredients', {
            fixture: 'ingredients.json'
          }).as('getIngredients');
          cy.intercept('GET', '/api/auth/user', {
            fixture: 'user.json'
        });
        cy.intercept('POST', '/api/orders', {
            fixture: 'orders.json'
        });
        cy.visit('/');
    });

    afterEach(() => {
        localStorage.clear();
        cy.clearCookie('accessToken');
    });

    it('should create an order successfully', () => {
        cy.get(BUN_SELECTOR).contains('Добавить').click().as('addBun');
        cy.get(INGREDIENT_SELECTOR).contains('Добавить').click().as('addIngredient');

        cy.get('button').contains('Оформить заказ').click();
        cy.get('[data-cy="modal"]').should('be.visible');
        cy.get('[data-cy="orderNumber"]').should('contain.text', '6969');

        cy.get(MODAL_CLOSE_SELECTOR).click();
        cy.get(MODAL_CLOSE_SELECTOR).should('not.exist');
        
        cy.get('[data-cy="bunTop"]').should('not.contain');
        cy.get('[data-cy="ingredient"]').should('not.contain');
        cy.get('[data-cy="bunButtom"]').should('not.contain');
    });
});