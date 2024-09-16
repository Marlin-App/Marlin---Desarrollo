describe('Touching all elementes from Productos para Ti corrousell', () => {

    beforeEach(() => {
        cy.viewport('samsung-s10')
        cy.visit('localhost:8081')
    })

    it('Hacer click en', () => {
        for (let n = 1; n <= 10; n++) {
            cy.contains(`Producto ${n}`).click();
            cy.contains('Agregar al carrito').click();
            cy.contains('-').click();
            cy.contains('+').click();
            cy.get('view[id="Item"]').click();
        }
    })
})