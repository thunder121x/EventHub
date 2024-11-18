describe("Reservation Test", () => {
    it('should have a reserve button that will redirect user to reservatiob page', () => {
        cy.visit("http://localhost:3000/EventDetail");

        cy.contains('participants').should('be.visible');
        cy.contains("Reserve").click();
       
        cy.url().should('include', '/Reservation');
        cy.contains("Contact information").should('be.visible');
        cy.contains("Primary Contact").should('be.visible');
        cy.contains("First Name").should('be.visible');
        cy.contains("Last Name").should('be.visible');
        cy.contains("Email").should('be.visible');
        cy.contains("Phone Number").should('be.visible');
        cy.contains("Terms of Service").should('be.visible'); 

        cy.get('input[placeholder="John"]').type("John"); 
        cy.get('input[placeholder="Doe"]').type("Doe"); 
        cy.get('input[placeholder="JohnDoe@gmail.com"]').type("JohnDoe@gmail.com"); 
        cy.get('input[placeholder="+66 (555) 000-0000"]').type("XXX-XXX-XXXX"); 
        cy.get('input[type="checkbox"]').check();
        cy.get('input[type="checkbox"]').check();

        cy.get('button[type="submit"]').click();
        cy.url().should("include", "/ReservationConfirmation");

        cy.contains("Your Reservation Is Successfully Booked!").should("be.visible");  
        cy.contains("We have sent your booking to the workshop provider.").should("be.visible");  
        cy.contains("Workshop").should("be.visible"); 
        cy.contains("Date & Time").should("be.visible"); 
        cy.contains("Customer").should("be.visible"); 
        cy.contains("Quantity").should("be.visible"); 
    });
});
