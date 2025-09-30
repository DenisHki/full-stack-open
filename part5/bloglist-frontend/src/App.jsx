import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

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

  const handleCreateBlog = async (blogData) => {
    try {
      const savedBlog = await blogService.create(blogData);
      setBlogs(blogs.concat(savedBlog));
      console.log("New blog saved: ", savedBlog);
    } catch (error) {
      console.error("Error saving blog:", error);
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
    }
  };

  const handleLogout = async () => {
    window.localStorage.removeItem("loggedBlogAppUser");
    blogService.setToken(null);
    setUser(null);
  };

  if (user === null) {
    return (
      <div>
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

      <BlogForm onCreate={handleCreateBlog} />
    </div>
  );
};

export default App;
