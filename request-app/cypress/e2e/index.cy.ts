describe("Home page load", () => {
  it("should navigate to the home page", () => {
    cy.visit("/");

    // check for the title
    cy.get("h1").should(
      "contain",
      "Embracing the future of requirement management"
    );

    // check for the "Link" to the login page
    cy.get("a").contains("Login").should("have.attr", "href", "/login");

    // check for a button to go to the registration page
    cy.get("button").should("contain", "Get started");
  });
});

export {};
