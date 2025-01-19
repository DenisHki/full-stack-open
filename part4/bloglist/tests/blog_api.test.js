const { test, after } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("assert");
const app = require("../app");

const api = supertest(app);

test("blogs are returned as json and contain the correct number of blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const expectedBlogs = 4;
  assert.strictEqual(
    response.body.length,
    expectedBlogs,
    `Expected ${expectedBlogs} blogs, but got ${response.body.length}`
  );
});

after(async () => {
  await mongoose.connection.close();
});
