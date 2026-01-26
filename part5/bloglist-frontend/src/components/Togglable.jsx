import { useState, useImperativeHandle, forwardRef } from 'react'
import { Button, Box } from '@mui/material'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility,
    }
  })

  return (
    <Box sx={{ my: 2 }}>
      {!visible && (
        <Button variant="contained" color="primary" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      )}

      {visible && (
        <Box>
          <Box sx={{ my: 2 }}>{props.children}</Box>
          <Button variant="outlined" onClick={toggleVisibility}>
            Cancel
          </Button>
        </Box>
      )}
    </Box>
  )
})

Togglable.displayName = 'Togglable'

export default Togglable
