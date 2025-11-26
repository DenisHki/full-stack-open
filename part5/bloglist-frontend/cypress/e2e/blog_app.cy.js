describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");

    const user = {
      name: "Denis Chuvakov",
      username: "chuden",
      password: "password",
    };
    cy.request("POST", "http://localhost:3001/api/users", user);

    cy.visit("http://localhost:5173");
  });

  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login-button").should("exist");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("chuden");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("User Denis Chuvakov is logged in");
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("chuden");
      cy.get("#password").type("wrongpassword");
      cy.get("#login-button").click();

      cy.contains("Wrong username or password");
      cy.contains("User Denis Chuvakov is logged in").should("not.exist");
    });
  });
});
