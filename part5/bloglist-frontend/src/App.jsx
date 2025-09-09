import { useState, useEffect } from "react";
import loginService from "./services/login";
import blogService from "./services/blogs";
import Blog from "./components/Blog";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.error("Wrong credentials");
    }
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
      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
