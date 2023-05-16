// Log in before running any tests
beforeEach(() => {
  cy.visit("/login");
  cy.get("input[name=email]").type(Cypress.env("email"));
  cy.get("input[name=password]").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();
});

describe("Documents page", () => {
  it("should navigate to the documents page", () => {
    // go to calendar
    cy.get("span").contains("Documents").click();
    cy.url().should("include", "/documents");

    // check for a <h1> tag with the text Documents
    cy.get("h1").contains("Documents");

    cy.wait(5000);

    // check if documents are loaded
    cy.get("ul").children().should("have.length.greaterThan", 0);
  });

  it("should load a grid of documents", () => {
    // go to documents
    cy.get("span").contains("Documents").click();

    // check if there is a ul with li elements
    cy.get("ul").children().should("have.length.greaterThan", 0);

    // check if inside the li elements there is a button to download the document
    cy.get("ul")
      .children()
      .each(($el) => {
        cy.wrap($el).find("button").should("be.visible");
      });
  });

  //   it should load a uppy Dashboard to upload a document
  it("should load a uppy Dashboard to upload a document", () => {
    // go to documents
    cy.get("span").contains("Documents").click();

    // check for a class with the name uppy-Dashboard
    cy.get(".uppy-Dashboard").should("be.visible");

    // check for a button with the text browse files
    cy.get("button").contains("browse files").should("be.visible");

    // click the button to open the file explorer
    cy.get("button").contains("browse files").click();
  });
});
