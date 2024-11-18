describe("User Login Test", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/");
    });
  
    it("should allow typing any valid email ending with @gmail.com and password, then clicking login", () => {
        cy.contains("Login").click();
        cy.get('input[placeholder="Your Email"]').type("test@gmail.com");
        cy.get('input[placeholder="Password"]').type("password123");
        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/Profile");
    });
});
  