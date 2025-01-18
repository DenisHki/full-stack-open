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

const mostBlogs = (blogs) => {
  const authorCounts = {};

  blogs.forEach((blog) => {
    if (authorCounts[blog.author]) {
      authorCounts[blog.author]++;
    } else {
      authorCounts[blog.author] = 1;
    }
  });

  let topAuthor = "";
  let maxBlogs = 0;

  for (const author in authorCounts) {
    if (authorCounts[author] > maxBlogs) {
      topAuthor = author;
      maxBlogs = authorCounts[author];
    }
  }

  return { author: topAuthor, blogs: maxBlogs };
};

const mostLikes = (blogs) => {
  const authorLikes = {};
  blogs.forEach((blog) => {
    if (authorLikes[blog.author]) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;
    }
  });
  //console.log('author likes:', authorLikes);
  let topAuthor = "";
  let maxLikes = 0;

  for (const author in authorLikes) {
    if (authorLikes[author] > maxLikes) {
      topAuthor = author;
      maxLikes = authorLikes[author];
    }
  }

  return { author: topAuthor, likes: maxLikes };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
