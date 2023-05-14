describe("Login page", () => {
  it("should navigate to the login page", () => {
    cy.visit("/login");
    cy.get("h2").should("contain", "Welcome back!");
  });
  it("should show an error message if the email is not valid", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type("test@test");
    cy.get("input[name=password]").type("test");
    cy.get("button").contains("Login").click();
    cy.get("div").contains("Invalid login credentials").should("be.visible");
  });
  it("should go to dashboard page if the email and password are valid", () => {
    cy.visit("/login");
    cy.get("input[name=email]").type(Cypress.env("email"));
    cy.get("input[name=password]").type(Cypress.env("password"));
    cy.get("button").contains("Login").click();
    cy.url().should("include", "/dashboard");
  });
});

export {};
