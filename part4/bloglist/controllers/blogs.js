const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

// GET ALL BLOGS
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

// GET BLOG BY ID
blogsRouter.get("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id);

    if (blog) {
      response.json(blog);
    } else {
      response.status(404).json({ error: "Blog not found" });
    }
  } catch (exception) {
    next(exception);
  }
});

// POST A NEW BLOG
blogsRouter.post("/", async (request, response, next) => {
  const body = request.body;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  });

  try {
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog);
  } catch (exception) {
    next(exception);
  }
});

// DELETE A BLOG
blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(request.params.id);

    if (!blog) {
      return response.status(404).json({ error: "Blog not found" });
    }

    response.status(204).end();
  } catch (exception) {
    next(exception);
  }
});

// UPDATE A BLOG
blogsRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes ? body.likes : 0,
  };

  await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(blog);
});

module.exports = blogsRouter;
