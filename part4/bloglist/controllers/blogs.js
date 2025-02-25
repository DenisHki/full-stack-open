const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

// GET TOKEN
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

// GET ALL BLOGS
blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  response.json(blogs);
});

// GET BLOG BY ID
blogsRouter.get("/:id", async (request, response) => {
  const blog = await Blog.findById(request.params.id);

  if (blog) {
    response.json(blog);
  } else {
    response.status(404).json({ error: "Blog not found" });
  }
});

// POST A NEW BLOG
blogsRouter.post("/", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

  if (!body.title || !body.url) {
    return response.status(400).json({
      error: "Title and URL are required",
    });
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

// DELETE A BLOG
blogsRouter.delete("/:id", async (request, response) => {
  const blog = await Blog.findByIdAndDelete(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.status(204).end();
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

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  });

  if (!updatedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  response.json(updatedBlog);
});

module.exports = blogsRouter;
