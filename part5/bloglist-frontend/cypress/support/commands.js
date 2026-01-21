Cypress.Commands.add("login", ({ username, password }) => {
  cy.request("POST", "http://localhost:3001/api/login", {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem("loggedBlogAppUser", JSON.stringify(body));
    cy.visit("http://localhost:5173");
  });
});

Cypress.Commands.add("createBlog", ({ title, author, url, likes = 0 }) => {
  const user = JSON.parse(localStorage.getItem("loggedBlogAppUser"));
  cy.request({
    method: "POST",
    url: "http://localhost:3001/api/blogs",
    body: { title, author, url, likes },
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  });
  cy.visit("http://localhost:5173");
});
