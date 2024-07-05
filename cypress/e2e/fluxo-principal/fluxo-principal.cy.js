/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Superfrete Tests: Fluxo de checkout Principal", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.viewport(1366, 768);

    cy.visit("https://web.superfrete.com/", { timeout: 10000 });
  });

  it("Load the Superfrete page: Fluxo de checkout Principal", () => {
    cy.get("#originPostcode").eq(0).type("08090284");

    cy.get(
      ".MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input.css-a393mn"
    )
      .eq(0)
      .click();
    cy.contains("li", "Caixa / Pacote").click();

    cy.get(
      ".MuiSelect-select.MuiSelect-standard.MuiInputBase-input.MuiInput-input.css-a393mn"
    )
      .eq(1)
      .click();
    cy.contains("li", "Até 300g").click();

    cy.get("#packageHeight").type("2");
    cy.get("#packageWidth").type("11");
    cy.get("#packageDepth").type("16");

    cy.get("#destinationPostcode").type("05407002");

    cy.get('[data-cy="calculator-submit"]').click({ timeout: 60000 });
    cy.wait(10000);

    cy.get(".MuiTypography-root.MuiTypography-body1.css-18m7gw6")
      .contains("PAC")
      .should("exist");

    cy.get(".MuiTypography-root.MuiTypography-body1.css-18m7gw6")
      .contains("SEDEX")
      .should("exist");

    cy.get(".MuiTypography-root.MuiTypography-body1.css-18m7gw6")
      .contains("Mini Envios")
      .should("exist");
  });
});
