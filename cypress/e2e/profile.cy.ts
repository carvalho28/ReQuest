// Log in before running any tests
beforeEach(() => {
  cy.visit("/login");
  cy.get("input[name=email]").type(Cypress.env("email"));
  cy.get("input[name=password]").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();
});

describe("Profile page", () => {
  it("should navigate to the profile page", () => {
    // look for the image that has id "Profile"
    cy.get("#Profile").click();
    // check if the url is correct
    cy.url().should("include", "/profile");

    // it should say "Profile" somewhere on the page
    cy.get("div").contains("Profile");
    cy.get("h3").contains("Global Stats");
  });

  // check if avatar is visible
  it("should load the avatar", () => {
    // look for the image that has id "Profile"
    cy.get("#Profile").click();

    // check if the avatar is visible
    cy.get("img").should("be.visible");
  });

  it("should load the cards", () => {
    // look for the image that has id "Profile"
    cy.get("#Profile").click();

    // check if the global stats card is visible
    cy.get("h3").contains("Global Stats");

    // check if the Projects card is visible
    cy.get("h3").contains("Projects");
  });
});

export {};
