import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return null;
    },
  },
});

let timeOut = null;

export const showNotification = (text, duration) => {
  return (dispatch) => {
    dispatch(createNotification(text));

    if (timeOut) {
      clearTimeout(timeOut);
    }
    timeOut = setTimeout(() => {
      dispatch(clearNotification());
      timeOut = null;
    }, duration * 1000);
  };
};

export const { createNotification, clearNotification } =
  notificationSlice.actions;
export default notificationSlice.reducer;
