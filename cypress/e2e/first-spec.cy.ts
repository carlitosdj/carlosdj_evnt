describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://localhost:3000/sales/subscribe/preconexao')
  })
})

describe('Navigation', () => {
  it('should navigate to the about page', () => {
    // Start from the index page
    cy.visit('http://localhost:3000/sales/subscribe/preconexao')
 
    // // Find a link with an href attribute containing "about" and click it
    // cy.get('a[href*="btn"]').click()
 
    // // The new url should include "/about"
    // cy.url().should('include', '/about')
 
    // The new page should contain an h1 with "About page"
    cy.get('h1').contains('Como não deixar nenhum centavo de honorários para trás.')
  })
})