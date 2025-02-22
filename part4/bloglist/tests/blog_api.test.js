const { test, after, beforeEach, describe } = require("node:test");
const assert = require("assert");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const bcrypt = require("bcrypt");

const api = supertest(app);
const helper = require("./test_helper");
const Blog = require("../models/blog");
const User = require("../models/user");

describe("when there are initially some blogs saved", () => {
  beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(helper.initialBlogs);
  });

  // 1

  describe("fetching blogs", () => {
    test("returns blogs as JSON and contains the correct number of blogs", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.length, helper.initialBlogs.length);
    });

    test("each blog has a unique identifier named 'id'", async () => {
      const response = await api
        .get("/api/blogs")
        .expect(200)
        .expect("Content-Type", /application\/json/);

      response.body.forEach((blog) => {
        assert(blog.id !== undefined, "blog does not have an 'id' property");
        assert.strictEqual(
          blog._id,
          undefined,
          "blog still has an '_id' property"
        );
      });
    });
  });

  // 2

  describe("addition of a new blog", () => {
    test("succeeds with a valid blog", async () => {
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
  });

  // 3

  describe("blog validation", () => {
    test("defaults 'likes' to 0 if missing", async () => {
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

    test("fails with status 400 if title is missing", async () => {
      const newBlog = {
        author: "Stephen King",
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

    test("fails with status 400 if URL is missing", async () => {
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
  });

  // 4

  describe("deletion of a blog", () => {
    test("succeeds with status 204 if ID is valid", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToDelete = blogsAtStart[0];

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

      const blogsAtEnd = await helper.blogsInDb();
      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1);

      const ids = blogsAtEnd.map((blog) => blog.id);
      assert(!ids.includes(blogToDelete.id));
    });
  });

  // 5

  describe("updating of a blog", () => {
    test("succeeds in updating the likes of a blog", async () => {
      const blogsAtStart = await helper.blogsInDb();
      const blogToUpdate = blogsAtStart[0];

      const updatedData = { ...blogToUpdate, likes: blogToUpdate.likes + 1 };

      const response = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updatedData)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      assert.strictEqual(response.body.likes, blogToUpdate.likes + 1);
    });
  });
});

after(async () => {
  await mongoose.connection.close();
});

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper statuscode and message if username already taken", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Superuser",
      password: "salainen",
    };

    const result = await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert(result.body.error.includes("expected `username` to be unique"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
