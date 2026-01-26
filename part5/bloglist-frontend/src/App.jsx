import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material'
import LogoutIcon from '@mui/icons-material/Logout'
import loginService from './services/login'
import blogService from './services/blogs'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { showNotification } from './reducers/notificationReducer'
import {
  initializeBlogs,
  createBlog,
  likeBlog,
  deleteBlog,
} from './reducers/blogReducer'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const handleCreateBlog = async (blogData) => {
    try {
      await dispatch(createBlog(blogData))
      console.log('New blog saved: ', blogData)

      blogFormRef.current.toggleVisibility()

      dispatch(
        showNotification(
          `New blog ${blogData.title} by ${blogData.author} added`
        )
      )
    } catch (error) {
      console.error('Error saving blog:', error)
      dispatch(showNotification('Error saving blog', 'error'))
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      console.log('Logged in user:', user)
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.error('Wrong credentials')
      dispatch(showNotification('Wrong username or password', 'error'))
    }
  }

  const handleLike = async (blog) => {
    try {
      await dispatch(likeBlog(blog))
    } catch (error) {
      console.error('Error liking blog:', error)
      dispatch(showNotification('Error liking blog', 'error'))
    }
  }

  const handleDelete = async (blog) => {
    const confirmDelete = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )

    if (confirmDelete) {
      try {
        await dispatch(deleteBlog(blog.id))
        dispatch(
          showNotification(`Blog ${blog.title} by ${blog.author} removed`)
        )
      } catch (error) {
        console.error('Error deleting blog:', error)
        dispatch(showNotification('Error deleting blog', 'error'))
      }
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    blogService.setToken(null)
    setUser(null)
    dispatch(showNotification('You are logged out'))
  }

  if (user === null) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ mt: 8 }}>
          <Notification />
          <Paper elevation={3} sx={{ p: 4 }}>
            <Typography variant="h4" component="h2" gutterBottom align="center">
              Log in to application
            </Typography>
            <Box component="form" onSubmit={handleLogin} sx={{ mt: 3 }}>
              <TextField
                fullWidth
                id="username"
                label="Username"
                variant="outlined"
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                id="password"
                label="Password"
                type="password"
                variant="outlined"
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                margin="normal"
              />
              <Button
                id="login-button"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Blog App
          </Typography>
          <Typography sx={{ mr: 2 }}>{user.name} logged in</Typography>
          <IconButton color="inherit" onClick={handleLogout}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Box sx={{ mt: 3 }}>
        <Notification />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 3 }}>
          Blogs
        </Typography>

        <Box sx={{ mb: 3 }}>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
              user={user}
            />
          ))}
        </Box>

        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm onCreate={handleCreateBlog} />
        </Togglable>
      </Box>
    </Container>
  )
}

export default App
