import { useState } from 'react'
import {
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Collapse,
  IconButton,
} from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'
import DeleteIcon from '@mui/icons-material/Delete'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const Blog = ({ blog, handleLike, handleDelete, user }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const isCreator =
    blog.user &&
    user &&
    (blog.user.username === user.username || blog.user.id === user.id)

  return (
    <Card className="blog" sx={{ mb: 2 }}>
      <CardContent>
        <Box
          className="blogSummary"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography variant="h6" component="div">
            {blog.title} —{' '}
            <Typography component="span" color="text.secondary">
              {blog.author}
            </Typography>
          </Typography>
          <IconButton onClick={toggleVisibility} size="small">
            {visible ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Box>

        <Collapse in={visible}>
          <Box className="blogDetails" sx={{ mt: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {blog.url}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 1 }}>
              <Typography variant="body2">Likes: {blog.likes}</Typography>
              <Button
                size="small"
                variant="outlined"
                startIcon={<ThumbUpIcon />}
                onClick={() => handleLike(blog)}
              >
                Like
              </Button>
            </Box>
            <Typography variant="body2" color="text.secondary">
              {blog.user?.name}
            </Typography>
            {isCreator && (
              <Button
                variant="contained"
                color="error"
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() => handleDelete(blog)}
                sx={{ mt: 2 }}
              >
                Remove
              </Button>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}

export default Blog
