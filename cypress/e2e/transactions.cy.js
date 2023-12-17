describe("Transactions list", () => {

  it("should show the transactions", () => {
    cy.intercept(
      "GET",
      "http://localhost:9000/api/transactions",
      { fixture: 'transactions.json' },
    );

    cy.visit("http://localhost:5173");
    cy.get("[data-cy=transaction]").should("have.length", 1);
    cy.get("[data-cy=transaction_place]").eq(0).contains("Chinese Restaurant");
    cy.get("[data-cy=transaction_date]").eq(0).should("contain", "01/11/2021"); //is hetzelfde als contains("...")
  });

  it("should show a loading indicator for a very slow response", () => {
    //gebruik van echte API call = dynamic response
  // cy.intercept(
  //     "http://localhost:9000/api/transactions",
  //     (req) => {
  //       //request gaat wachten op response en als we de response hebben dan gaan we de functie uitvoeren
  //       req.on("response", (res) => {
  //         res.setDelay(1000); //vertraging van 1000milliseconde
  //       });
  //     },
  //   ).as("slowResponse"); //alias meegeven > zodat we deze request kunnen onderscheiden van andere requests
  //   cy.visit("http://localhost:5173");
  //   cy.get("[data-cy=loader]").should("be.visible");
  //   cy.wait("@slowResponse"); //wacht op slowresponse die we hierboven hebben gedefinieerd
  //   cy.get("[data-cy=loader]").should("not.exist");

    //bovenstaande herschrijven als > gebruik van mockdata = static response
    cy.intercept(
      "GET",
      "http://localhost:9000/api/transactions",
      {
        fixture: "transactions.json",
        delay: 1000
      }
    ).as("slowResponse"); //alias meegeven > zodat we deze request kunnen onderscheiden van andere requests
    cy.visit("http://localhost:5173");
    cy.get("[data-cy=loader]").should("be.visible");
    cy.wait("@slowResponse"); //wacht op slowresponse die we hierboven hebben gedefinieerd
    cy.get("[data-cy=loader]").should("not.exist");
  });

  //test voor de zoekfunctie
  it('should show all transactions for the Irish pub', () => {
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=transactions_search_input]').type('Ir');
    cy.get('[data-cy=transactions_search_btn]').click();

    cy.get("[data-cy=transaction]").should("have.length", 3);
    cy.get("[data-cy=transaction_place]").eq(0).contains(/Irish Pub/);
  });

  it('should show a message when no transactions are found', () => {
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=transactions_search_input]').type('xyz');
    cy.get('[data-cy=transactions_search_btn]').click();

    cy.get('[data-cy=no_transactions_message]').should("exist");
  });

  it('should show an error if the API call fails', () => {
    cy.intercept(
      'GET',
      'http://localhost:9000/api/transactions',
      {
        statusCode: 500,
        body: {
          error: 'Internal server error',
        },
      },
    );
    cy.visit('http://localhost:5173');

    cy.get('[data-cy=axios_error_message').should('exist');
  });
});