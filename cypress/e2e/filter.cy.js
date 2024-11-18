describe("Workshop Filter", () => {
    it("should select all filters, including clicking a valid date range, redirect to the filter page, select a workshop, and view details", () => {
        cy.visit("http://localhost:3000/");

        cy.get(".input-field").contains("Workshop Type...").click();
        cy.contains("Creative").click();

        cy.get('input[placeholder="Province..."]').click();
        cy.contains("Bangkok").click();

        cy.get(".input-field").contains(/^\d{1,2}\/\d{1,2}\/\d{4}/).click();
        cy.get(".rdrDay").contains("17").click();

        cy.get("button.search-button").contains("Search").click();

        cy.url().should("include", "/Filter");

        cy.contains("Creative").should("be.visible");
        cy.contains("Bangkok").should("be.visible");

        cy.contains("Authentic Thai Cooking").click();
        cy.url().should("include", "/EventDetail");

        cy.contains("Authentic Thai Cooking").should("be.visible");
    });
  });
  