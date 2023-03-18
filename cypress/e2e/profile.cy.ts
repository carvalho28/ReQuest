describe("Profile page load", () => {
  it("should navigate to the profile page", () => {
    // login
    cy.visit("/login");
    cy.get("input[name=email]").type(Cypress.env("email"));
    cy.get("input[name=password]").type(Cypress.env("password"));
    cy.get("button").contains("Login").click();

    // look for the image that has id "Profile"
    cy.get("#Profile").click();
    // check if the url is correct
    cy.url().should("include", "/profile");

    // it should say "Profile" somewhere on the page
    cy.get("div").contains("Profile");
    cy.get("h3").contains("Global Stats");
  });
});

export {};
