import { useState } from 'react'

const BlogForm = ({ onCreate }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    if (name === 'title') {
      setNewTitle(value)
    } else if (name === 'author') {
      setNewAuthor(e.target.value)
    } else if (name === 'url') {
      setNewUrl(value)
    }
    //console.log(`${name}: ${value}`);
  }

  const handleSubmitBlog = async (e) => {
    e.preventDefault()

    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    try {
      await onCreate(newBlog)
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
    } catch (error) {
      console.error('Error saving blog:', error)
    }
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <h2>Create new blog</h2>
      <form onSubmit={handleSubmitBlog}>
        <input
          id="title"
          type="text"
          name="title"
          value={newTitle}
          placeholder="Title"
          style={{ marginRight: '0.5rem' }}
          onChange={handleChange}
        />
        <input
          id="author"
          type="text"
          name="author"
          value={newAuthor}
          placeholder="Author"
          style={{ marginRight: '0.5rem' }}
          onChange={handleChange}
        />
        <input
          id="url"
          type="text"
          name="url"
          value={newUrl}
          placeholder="URL"
          style={{ marginRight: '0.5rem' }}
          onChange={handleChange}
        />
        <button id="create-button" type="submit">
          Add Blog
        </button>
      </form>
    </div>
  )
}

export default BlogForm
