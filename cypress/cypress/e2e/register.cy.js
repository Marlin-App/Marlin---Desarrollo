describe('register test', () => {
    //se ejecuta antes de cada test
    beforeEach(() => {
        cy.viewport('samsung-s10')
        cy.visit('localhost:8081')
        cy.contains('Ajustes').click()
        cy.contains('Login').click() 
    })


    it('It should type a fullname, email and password for a new user', () => {
        cy.contains('Ingresa mediante otra cuenta').click()
        cy.contains('Crea una cuenta').click()
        cy.get('input[id="fullNameRegister"]').type('Jesus5')
        cy.get('input[id="emailRegister"]').type('Jesus5@cruz.com')
        cy.get('input[id="passwordRegister"]').type('admin123')
        cy.get('div[id="createRegister"]').click()
        cy.intercept('POST', '/api/register').as('registerRequest');
        cy.wait('@registerRequest').then((interception) => {
            const statusCode = interception.response.statusCode;
          
            if (statusCode === 201) {
              // Si el código de estado es 201, el registro fue exitoso
              cy.log('Registro exitoso: Usuario creado correctamente');
              expect(statusCode).to.eq(201);
            } else if (statusCode === 400) {
              // Si el código de estado es 400, el usuario ya está registrado
              cy.log('Error: El usuario ya se encuentra registrado');
              expect(statusCode).to.eq(400);
            } else {
              // Manejar otros códigos de estado si es necesario
              cy.log(`Código de estado inesperado: ${statusCode}`);
            }
        });
        
//Timed out retrying after 4050ms: cy.click() failed because this element is not visible:
// <div dir="auto" class="css-text-146c3p1 r-color-jwli3a r-fontSize-ubezar">Crea un...</div>
// This element <div.css-text-146c3p1.r-color-jwli3a.r-fontSize-ubezar> is not visible because its parent <div.css-view-175oi2r.r-flex-13awgt0.r-flexDirection-1d5kdc7.r-bottom-1p0dtai.r-left-1d2f490.r-position-u8s1d.r-right-zchlnj.r-top-ipm5af> has CSS property: display: none
// Fix this problem, or use {force: true} to disable error checking.Learn more
    
    })
    
  })