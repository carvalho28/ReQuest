describe("Dashboard page load", () => {
  it("should navigate to the dashboard page", () => {
    cy.visit("/dashboard");

    // click on the "Link" to the teams page
    cy.get("a").contains("Teams").should("have.attr", "href", "/teams");
    // click on link and check if the url is correct
    cy.get("a").contains("Teams").click();
    cy.url().should("include", "/teams");

    // click on the "Link" to the projects page
    // cy.get("a").contains("Projects").should("have.attr", "href", "/projects");
    // // click on link and check if the url is correct
    // cy.get("a").contains("Projects").click();
    // cy.url().should("include", "/projects");
  });
});
