const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("assert");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});

  for (let b of helper.initialBlogs) {
    const blogObject = new Blog(b);
    await blogObject.save();
  }
});

test("blogs are returned as json and contain the correct number of blogs", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("unique identifier property is named id", async () => {
  const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

  response.body.forEach((blog) => {
    assert(blog.id !== undefined, "Blog does not have an 'id' property");
    assert.strictEqual(blog._id, undefined, "Blog still has an '_id' property");
  });
});
/*
test("a valid blog can be added", async () => {
  const newBlog = {
    title: "New Blog",
    author: "New Author",
    url: "http://example.com/blog3",
    likes: 5,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((b) => b.title);
  assert(titles.includes("New Blog"));
});
*/
/*
test("likes defaults to 0 if missing", async () => {
  const newBlog = {
    title: "No Likes Blog",
    author: "Boring Author",
    url: "http://example.com/blog5",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});
*/
test("returns 400 if title is missing", async () => {
  const newBlog = {
    author: "stephen king",
    url: "http://stephenking.com",
    likes: 777,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error, "Title and URL are required");
});

test("returns 400 if url is missing", async () => {
  const newBlog = {
    title: "Hockey Blog",
    author: "Denis Chuvakov",
    likes: 99,
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(400)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.error, "Title and URL are required");
});

after(async () => {
  await mongoose.connection.close();
});
