/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Superfrete Tests: Formatos de envio", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.viewport(1366, 768);

    cy.visit("https://web.superfrete.com/", { timeout: 10000 });
  });

  it("Fluxo com formatos de envio incorretos", () => {
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
    cy.contains("li", "Digitar peso").click();

    cy.get("#userWrittenWeight").type("300");

    cy.get("#packageHeight").type("0.3");
    cy.get("#packageWidth").type("7");
    cy.get("#packageDepth").type("12");

    cy.get("#destinationPostcode").type("05407002");

    cy.get('[data-cy="calculator-submit"]').click({ timeout: 60000 });
    cy.wait(10000);

    cy.get(
      ".MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeMedium.MuiFormHelperText-filled.css-i9r6p6"
    )
      .contains("Altura mínima 0.4 cm.")
      .should("be.visible");

    cy.get(
      ".MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeMedium.MuiFormHelperText-filled.css-i9r6p6"
    )
      .contains("Largura mínima 8 cm.")
      .should("be.visible");

    cy.get(
      ".MuiFormHelperText-root.Mui-error.MuiFormHelperText-sizeMedium.MuiFormHelperText-filled.css-i9r6p6"
    )
      .contains("Comprimento mínimo 13 cm.")
      .should("be.visible");
  });
});
