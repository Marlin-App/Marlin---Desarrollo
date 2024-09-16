describe('Validate User API Call', () => {

    it('Verify API Success', () => {
            cy.intercept('/users').as('users')
            cy.visit('http://localhost:19006/');
            cy.wait('@users').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })
    
    });
    
    })