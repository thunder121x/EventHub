describe("Sign Up Test", () => {
  
    it('should have a "Sign up now" link and redirect to the SignUp page', () => {
        cy.visit("http://localhost:3000/");

        cy.contains("Login").click();
        cy.contains('Not a member?').should('be.visible');
        cy.contains('Sign up now').should('be.visible');

        cy.get('a[href="/SignUp"]').should('have.attr', 'href', '/SignUp');
        cy.contains('Sign up now').click();

        cy.url().should('include', '/SignUp');
        cy.contains("Create an account").should('be.visible');

        cy.get('input[placeholder="John"]').type("John"); 
        cy.get('input[placeholder="Doe"]').type("Doe"); 
        cy.get('input[placeholder="JohnDoe@gmail.com"]').type("JohnDoe@gmail.com"); 
        cy.get('input[placeholder="Password"]').type("Password123"); 
        cy.get('input[type="checkbox"]').check();
        cy.get('button.bg-primary').click();
        
        cy.url().should("include", "/Login");
        cy.contains("Log in").should("be.visible");  
    });
});
