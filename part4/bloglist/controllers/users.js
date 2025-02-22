const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// GET ALL BLOGS
usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs");
  console.log("Users found:", users);
  response.json(users);
});
// CREATE A NEW USER
usersRouter.post("/", async (request, response) => {
  const { username, name, password } = request.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

module.exports = usersRouter;
