import { useState, useEffect, useRef } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState({ message: null, type: "" });

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const blogFormRef = useRef();

  const handleCreateBlog = async (blogData) => {
    try {
      const savedBlog = await blogService.create(blogData);
      setBlogs(blogs.concat(savedBlog));
      console.log("New blog saved: ", savedBlog);

      blogFormRef.current.toggleVisibility();

      setNotification({
        message: `New blog ${savedBlog.title} by ${savedBlog.author} added`,
      });
      setTimeout(() => {
        setNotification({ message: null });
      }, 3000);
    } catch (error) {
      console.error("Error saving blog:", error);
      setNotification({ message: "Error saving blog", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: "" });
      }, 3000);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      console.log("Logged in user:", user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error("Wrong credentials");
      setNotification({ message: "Wrong username or password", type: "error" });
      setTimeout(() => {
        setNotification({ message: null, type: "" });
      }, 3000);
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
    setNotification({ message: "You are logged out" });
    setTimeout(() => {
      setNotification({ message: null, type: "" });
    }, 3000);
  };

  if (user === null) {
    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form
          onSubmit={handleLogin}
          style={{ padding: "1rem", backgroundColor: "#f4f4f4" }}
        >
          <div style={{ marginBottom: "1rem" }}>
            username
            <input
              type="text"
              value={username}
              onChange={({ target }) => setUsername(target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              style={{ marginLeft: "0.5rem" }}
            />
          </div>
          <button type="submit" style={{ marginTop: "1rem" }}>
            login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <Notification notification={notification} />
      <div style={{ display: "flex", alignItems: "center" }}>
        <p style={{ marginRight: "1rem" }}>
          User <strong>{user.name}</strong> is logged in
        </p>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm onCreate={handleCreateBlog} />
      </Togglable>
    </div>
  );
};

export default App;
