describe('Login test', () => {
    //se ejecuta antes de cada test
    beforeEach(() => {
        cy.viewport('samsung-s10')
        cy.visit('localhost:8081')
        cy.contains('Ajustes').click()
        cy.contains('Login').click() 
    })


    it('It should type an email and password of an user already registered', () => {
        cy.contains('Ingresa mediante otra cuenta').click()
        cy.get('input[id="email"]').type('drexjesusguzman@gmail.com')
        cy.get('input[id="password"]').type('admin123')
        cy.contains('Ingresa a la cuenta').click()
        //logica para terminar de navegar a la pagina principal
    })

    // it('It should login using a google account', () => {
    //     cy.contains('Ingresar mediaten google').click()
        //logica para iniciar sesion mediante google
    // })

  })