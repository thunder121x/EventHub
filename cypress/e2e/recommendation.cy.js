describe("Recommendation in the Homepage", () => {
    it("should allow user to select recommendation workshop in homepage then redirect to workshop detail page", () => {
        cy.visit("http://localhost:3000/");

        cy.contains("Workshop Recommendations").should("be.visible");

        cy.contains("Authentic Thai Cooking").should("be.visible");
        cy.contains("Authentic Thai Cooking").click();
        cy.url().should("include", "/EventDetail");

        cy.contains("Authentic Thai Cooking").should("be.visible");
    });
  });
  