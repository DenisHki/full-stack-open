import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
      <div>
        <Notification />
        <h2>Log in to application</h2>
        <form
          onSubmit={handleLogin}
          style={{ padding: '1rem', backgroundColor: '#f4f4f4' }}
        >
          <div style={{ marginBottom: '1rem' }}>
            username
            <input
              id="username"
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </div>
          <div>
            password
            <input
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              style={{ marginLeft: '0.5rem' }}
            />
          </div>
          <button id="login-button" type="submit" style={{ marginTop: '1rem' }}>
            login
          </button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <Notification />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <p style={{ marginRight: '1rem' }}>
          User <strong>{user.name}</strong> is logged in
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          handleDelete={handleDelete}
          user={user}
        />
      ))}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
    </div>
  )
}

export default App
