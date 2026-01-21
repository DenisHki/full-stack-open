import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    message: null,
    type: '',
  },
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
    clearNotification(state, action) {
      return {
        message: null,
        type: '',
      }
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const showNotification = (message, type = '', duration = 3000) => {
  return async (dispatch) => {
    dispatch(setNotification({ message, type }))

    setTimeout(() => {
      dispatch(clearNotification())
    }, duration)
  }
}

export default notificationSlice.reducer
