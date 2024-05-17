describe("Login", () => {
    it("it should email or password not be empty", () => {
        cy.once('uncaught:exception', () => false);

        cy.visit("http://localhost:5173/")
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=button-login]").click()
        cy.on("window:alert", (text) => {
            expect(text).to.equal('"email is not allowed to be empty')
        })
    })
    it("it should password not be empty", () => {
        cy.once('uncaught:exception', () => false);
        cy.visit("http://localhost:5173/")
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=email]").type("k6h5x@example.com")
        cy.get("[data-cy=button-login]").click()
        cy.on("window:alert", (text) => {
            expect(text).to.equal('"password is not allowed to be empty')
        })
    })
    it("it should email or password wrong", () => {
        cy.once('uncaught:exception', () => false);
        cy.visit("http://localhost:5173/")
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=email]").type("k6h5x@example.com")
        cy.get("[data-cy=password]").type("12345678")
        cy.get("[data-cy=button-login]").click()
        cy.on("window:alert", (text) => {
            expect(text).to.equal('"email or password is wrong"')
        })
    })
    it("it should login successfully", () => {
        cy.once('uncaught:exception', () => false);
        cy.visit("http://localhost:5173/")
        cy.get("[data-cy=login]").click()
        cy.get("[data-cy=email]").type("nani@gmail.com")
        cy.get("[data-cy=password]").type("nani123")
        cy.get("[data-cy=button-login]").click()
        cy.get("[data-cy=logout]").click()
    })
}) 