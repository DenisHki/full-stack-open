const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((max, blog) =>
    blog.likes > max.likes
      ? { title: blog.title, author: blog.author, likes: blog.likes }
      : max
  );
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
