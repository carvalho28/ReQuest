describe("Dashboard page load", () => {
  it("should navigate to the dashboard page", () => {
    // login
    cy.visit("/login");
    cy.get("input[name=email]").type(Cypress.env("email"));
    cy.get("input[name=password]").type(Cypress.env("password"));
    cy.get("button").contains("Login").click();

    // check "Teams" is working
    cy.get("a").contains("Teams").click();
    cy.url().should("include", "/teams");

    // click on the "Link" to the projects page
    // cy.get("a").contains("Projects").should("have.attr", "href", "/projects");
    // // click on link and check if the url is correct
    // cy.get("a").contains("Projects").click();
    // cy.url().should("include", "/projects");
  });
});

export {};
