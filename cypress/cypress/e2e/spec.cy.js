describe('template spec', () => {
  it('passes', () => {
    cy.viewport('iphone-5')
    cy.visit('192.168.0.14:8081')
    cy.contains('Ajustes').click()
    cy.contains('Login').click()
  })
})