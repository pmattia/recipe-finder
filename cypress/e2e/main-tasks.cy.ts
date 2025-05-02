describe('Main tasks', () => {
  const apiurl = 'https://www.themealdb.com/api/json/v1/1/';

  it('should display an homepage', () => {
    cy.visit('/'); // Navigate to the home page
    cy.get('h1').should('exist');
    cy.get('search-recipe').should('exist');

    // Check if the search bar is visible
    cy.get('input[placeholder="Search recipes"]').should('be.visible');
  });

  it('should display suggestion when searching', () => {

    cy.fixture('recipes.json').then((recipes) => {
      cy.intercept('GET', `${apiurl}search.php?s=pasta`, {
        statusCode: 200,
        body: recipes,
      }).as('searchRecipes');
    });

    cy.visit('/'); // Navigate to the home page

    // Type a query and submit
    cy.get('input[placeholder="Search recipes"]').type('pasta');

    // Check if the results are displayed
    cy.get('mat-option').should('be.visible');
    cy.get('mat-option').should('have.length', 2);
  });

  it('should display a result list', () => {
    cy.fixture('recipes.json').then((recipes) => {
      cy.intercept('GET', `${apiurl}search.php?s=pasta`, {
        statusCode: 200,
        body: recipes,
      }).as('searchRecipes');
    });

    cy.visit('/recipes/pasta'); // Navigate to result page

    // Check if the results are displayed
    cy.get('recipe-card').should('be.visible');
    cy.get('recipe-card').should('have.length', 2);

    cy.get('recipe-card').first().within(() => {
      cy.get('h2').contains('Spaghetti Bolognese');
      cy.get('.tag').contains('Beef');
    });
  });

  it('should display a detail page', () => {
    cy.fixture('recipe-detail.json').then((recipe) => {
      cy.intercept('GET', `${apiurl}lookup.php?i=52772`, {
        statusCode: 200,
        body: recipe,
      }).as('getRecipeDetails');
    });

    cy.visit('/recipe/52772'); // Navigate to detail page

    // Check if main info are displayed
    cy.get('h2').should('be.visible');
    cy.get('h3').should('be.visible')
    cy.get('recipe-thumb').should('be.visible')
    cy.get('h3').should('have.length', 2);

    cy.get('h2').contains('Teriyaki Chicken Casserole');
    cy.get('#add-to-favourites').should('be.visible');
  });


  it('should add a recipe to favourites', () => {

    cy.visit('/recipe/52772'); // Navigate to detail page

    cy.get('#add-to-favourites').should('exist');
    cy.get('#add-to-favourites').should('be.visible');
    cy.get('#add-to-favourites').click();
    cy.get('#add-to-favourites').should('not.exist');
    cy.get('#remove-from-favorites').should('be.visible');
    cy.get('#goto-favourites').should('be.visible');
  });

  it('should show a feedback when an error occurs', () => {
    cy.fixture('empty-response.json').then((empty) => {
      cy.intercept('GET', `${apiurl}search.php?s=pasta`, {
        statusCode: 500,
        body: empty,
      }).as('searchRecipesError');
    });

    cy.visit('/'); // Navigate to the home page

    // Type a query and submit
    cy.get('input[placeholder="Search recipes"]').type('pasta');

    // Check if the results are displayed
    cy.get('simple-snack-bar').should('be.visible');
  });
});