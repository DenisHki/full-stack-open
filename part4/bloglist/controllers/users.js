const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

// GET ALL USERS
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

// DELETE USER BY ID
usersRouter.delete("/:id", async (request, response) => {
    try {
      const user = await User.findById(request.params.id);
  
      if (!user) {
        return response.status(404).json({ error: "User not found" });
      }
  
      await User.findByIdAndDelete(request.params.id);
      response.status(204).end();
    } catch (error) {
      response.status(400).json({ error: "Invalid user ID format" });
    }
  });

module.exports = usersRouter;
