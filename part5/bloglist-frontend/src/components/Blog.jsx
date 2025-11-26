import { useState } from "react";

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const isCreator = blog.user && user && (blog.user.username === user.username || blog.user.id === user.id);

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} — {blog.author}{" "}
        <button onClick={toggleVisibility}>{visible ? "hide" : "view"}</button>
      </div>

      {visible && (
        <div className="blogDetails">
          <p>{blog.url}</p>
          <p>
            likes: {blog.likes}{" "}
            <button onClick={() => handleLike(blog)}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {isCreator && (
            <button
              onClick={() => handleDelete(blog)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                padding: "5px 10px",
                border: "none",
                borderRadius: "3px",
                cursor: "pointer",
              }}
            >
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;