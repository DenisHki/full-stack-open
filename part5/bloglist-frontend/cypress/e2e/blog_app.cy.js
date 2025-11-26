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

  // 5.17
  it("Login form is shown", function () {
    cy.contains("Log in to application");
    cy.get("#username").should("exist");
    cy.get("#password").should("exist");
    cy.get("#login-button").should("exist");
  });

  // 5.18
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

  // 5.19:
  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("chuden");
      cy.get("#password").type("password");
      cy.get("#login-button").click();
      cy.contains("User Denis Chuvakov is logged in");
    });

    it("A blog can be created", function () {
      cy.contains("new blog").click();

      cy.get("#title").type("A New Cypress Blog");
      cy.get("#author").type("Denis Chuvakov");
      cy.get("#url").type("http://cypress-blog.com");
      cy.get("#create-button").click();

      cy.get(".blog").should("contain", "A New Cypress Blog");
      cy.get(".blog").should("contain", "Denis Chuvakov");
    });
  });
});
