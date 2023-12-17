describe('Add transaction', () => {

  it("should add a transaction", () => {
    cy.visit("http://localhost:5173/transactions/add");

    cy.get("[data-cy=user_input]").type("2");
    cy.get("[data-cy=date_input]").type("2021-11-01");
    cy.get("[data-cy=place_input]").select("Irish Pub");
    cy.get("[data-cy=amount_input]").type("200");
    cy.get("[data-cy=submit_transaction]").click();

    cy.get("[data-cy=transaction_user]").eq(9).contains("Pieter");
    cy.get("[data-cy=transaction_amount]").each((element, index) => {
      if (index === 9) {
        expect(Number(element[0].textContent.replace(/^\D+/g, '').replace(/,/, '.'))).to.equal(200);
      }
    });
    cy.get("[data-cy=transaction]").should("have.length", 10);
  });

  it("should remove the transaction", () => {
    cy.visit("http://localhost:5173/transactions/");
    cy.get("[data-cy=transaction_remove_btn]").eq(9).click(); // 9 = index
    cy.get("[data-cy=transaction]").should("have.length", 9); // 9 = aantal transacties
  });

  it("should show the error message for an invalid user id", () => {
    cy.visit("http://localhost:5173/transactions/add");

    cy.get("[data-cy=user_input]").type("-1");
    cy.get("[data-cy=submit_transaction]").click();

    cy.get("[data-cy=label_input_error]").contains("min 1");
  });
});