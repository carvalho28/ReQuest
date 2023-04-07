describe("Dashboard page load", () => {
  it("should navigate to the dashboard page", () => {
    // login
    cy.visit("/login");
    cy.get("input[name=email]").type(Cypress.env("email"));
    cy.get("input[name=password]").type(Cypress.env("password"));
    cy.get("button").contains("Login").click();

    // check "Teams" is working
    cy.get("span").contains("Projects").click();
    cy.url().should("include", "/projects");
  });
});

export {};
