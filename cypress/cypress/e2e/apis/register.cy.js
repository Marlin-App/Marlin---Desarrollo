describe('Validate User API Call', () => {

    it('Verify API Success', () => {
            cy.intercept('POST', '/api/register').as('register')
            cy.wait('@users').then(({response}) => {
                expect(response.statusCode).to.eq(200)
            })
    
    });
    
    })