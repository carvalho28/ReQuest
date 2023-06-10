// Log in before running any tests
beforeEach(() => {
  cy.visit("/login");
  cy.get("input[name=email]").type(Cypress.env("email"));
  cy.get("input[name=password]").type(Cypress.env("password"));
  cy.get("button").contains("Login").click();
});

describe("Calendar page", () => {
  it("should navigate to the calendar page", () => {
    // go to calendar
    // cy.get("h1").contains("Calendar").click();
    cy.get("span").contains("Calendar").click();
    cy.url().should("include", "/calendar");
  });

  it("should verify is date in calendar when loaded is today month and year", () => {
    cy.wait(1000);
    cy.get("span").contains("Calendar").click();
    // check for a <time> tag
    cy.get("time").should("be.visible");
    // check for a <time> tag with the current month and year
    cy.get("time").contains(
      new Date().toLocaleString("default", { month: "long" })
    );
  });

  //   click on month view span, than click on year view button and check if the year is the same as the current year
  it("should change to year view", () => {
    cy.get("span").contains("Calendar").click();
    // check for a span with month view
    cy.get("span").contains("Month view").click();
    // check for a button with year view
    cy.get("button").contains("Year view").click();
    // check for a <time> tag with the current year
    cy.get("time").contains(new Date().getFullYear());
  });

  // check if next and previous button are working
  it("should go to next month when clicking on next button", () => {
    cy.get("span").contains("Calendar").click();
    // check for an svg within a button with the next month
    cy.get("span.sr-only").contains("Next month").click({ force: true });
    // check for a <time> tag with the the following month
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    cy.get("time").contains(
      nextMonth.toLocaleString("default", { month: "long" })
    );
  });

  it("should go to previous month when clicking on previous button", () => {
    cy.get("span").contains("Calendar").click();
    // check for an svg within a button with the previous month
    cy.get("span.sr-only").contains("Previous month").click({ force: true });
    // check for a <time> tag with the the previous month
    const previousMonth = new Date();
    previousMonth.setMonth(previousMonth.getMonth() - 1);
    cy.get("time").contains(
      previousMonth.toLocaleString("default", { month: "long" })
    );
  });

  //   change to year view, click on next year button and check if the year is the same as the current year + 1
  it("should go to next year when clicking on next button", () => {
    cy.get("span").contains("Calendar").click();
    // check for a span with month view
    cy.get("span").contains("Month view").click();
    // check for a button with year view
    cy.get("button").contains("Year view").click();
    // check for an svg within a button with the next year
    cy.get("span.sr-only").contains("Next month").click({ force: true });
    // check for a <time> tag with the the following year
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    cy.get("time").contains(nextYear.getFullYear());
  });

  //   change to year view, click on previous year button and check if the year is the same as the current year - 1
  it("should go to previous year when clicking on previous button", () => {
    cy.get("span").contains("Calendar").click();
    // check for a span with month view
    cy.get("span").contains("Month view").click();
    // check for a button with year view
    cy.get("button").contains("Year view").click();
    // check for an svg within a button with the previous year
    cy.get("span.sr-only").contains("Previous month").click({ force: true });
    // check for a <time> tag with the the previous year
    const previousYear = new Date();
    previousYear.setFullYear(previousYear.getFullYear() - 1);
    cy.get("time").contains(previousYear.getFullYear());
  });
});

export {};
