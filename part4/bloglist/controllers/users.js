const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

// GET ALL USERS
usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
  })
  //console.log("Users found:", users);
  response.json(users)
})
// CREATE A NEW USER
usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username) {
    return response.status(400).json({ error: 'Username is required' })
  }

  if (!password) {
    return response.status(400).json({ error: 'Password is required' })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'Username and password must be at least 3 characters long',
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

// DELETE USER BY ID
usersRouter.delete('/:id', async (request, response) => {
  try {
    const user = await User.findById(request.params.id)

    if (!user) {
      return response.status(404).json({ error: 'User not found' })
    }

    await User.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch (error) {
    response.status(400).json({ error: 'Invalid user ID format' })
  }
})

module.exports = usersRouter
