import { useState } from 'react'
import { TextField, Button, Box, Typography, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const BlogForm = ({ onCreate }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

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
    <Paper elevation={2} sx={{ p: 3, mt: 2 }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Create new blog
      </Typography>
      <Box component="form" onSubmit={handleSubmitBlog}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          fullWidth
          value={newTitle}
          placeholder="Title"
          onChange={(e) => setNewTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          id="author"
          label="Author"
          variant="outlined"
          fullWidth
          value={newAuthor}
          placeholder="Author"
          onChange={(e) => setNewAuthor(e.target.value)}
          margin="normal"
        />
        <TextField
          id="url"
          label="URL"
          variant="outlined"
          fullWidth
          value={newUrl}
          placeholder="URL"
          onChange={(e) => setNewUrl(e.target.value)}
          margin="normal"
        />
        <Button
          id="create-button"
          type="submit"
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          sx={{ mt: 2 }}
        >
          Add Blog
        </Button>
      </Box>
    </Paper>
  )
}

export default BlogForm
