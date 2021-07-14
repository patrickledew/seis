/// <reference types="cypress" />

describe("Lobby 404 Page", () => {

    beforeEach(() => {
        cy.visit('/lobby/abcdefg');
    })

    it("Shows 404", () => {
        // Make sure that it checks that the lobby exists first
        cy.intercept('GET', '/lobbyexists?id=*');
        cy.contains("Lobby Not Found.");

        // Make sure alert pops up and fades away
        cy.get("#lobby-alerts").within(() => {
            cy.contains("Lobby doesnt exist.").should("be.visible");
        })
    });

    it("Navigates to Home", () => {
        cy.wait(50);
        cy.contains("GO BACK", {matchCase: false}).should("exist").click();
        cy.url().should("eq", Cypress.config().baseUrl + '/');
    })

    it("Can create a new lobby", () => {
        cy.wait(50);
        cy.contains("CREATE LOBBY", {matchCase: false}).click();
        cy.url().should("change");
        cy.url().should("match", /\/lobby\/..../);
            
    })
});

describe("Lobby Username Screen", () => {
    beforeEach(() => {
        cy.request("/api/createlobby").then((res) => {
            cy.visit(`/lobby/${res.body}`);
        })
    })

    it("Displays username screen", () => {
        cy.contains("Join Lobby").should("exist").and("")
        cy.contains("Username").should("exist");
    });
})