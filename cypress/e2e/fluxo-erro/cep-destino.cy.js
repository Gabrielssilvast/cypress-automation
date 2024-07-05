/// <reference types="cypress" />

Cypress.on("uncaught:exception", (err, runnable) => {
  return false;
});

describe("Fluxo de não conformidade: CEP Destino", () => {
  beforeEach(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.clearAllSessionStorage();

    cy.viewport(1366, 768);

    cy.visit("https://web.superfrete.com/", { timeout: 10000 });
  });

  it("Fluxo de não conformidade: sem o CEP de Destino", () => {
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

    cy.get('[data-cy="calculator-submit"]').click({ timeout: 10000 });

    cy.get("#destinationPostcode-helper-text")
      .should("be.visible")
      .should("have.text", "CEP de destino é obrigatório");
  });
});
