import { useSelector } from 'react-redux'
import { Alert } from '@mui/material'

const Notification = () => {
  const notification = useSelector((state) => state.notification)

  if (!notification || !notification.message) return null

  return (
    <Alert
      severity={notification.type === 'error' ? 'error' : 'success'}
      sx={{ mb: 2 }}
    >
      {notification.message}
    </Alert>
  )
}

export default Notification
