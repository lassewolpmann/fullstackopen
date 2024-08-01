import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    addNotification: (state, action) => action.payload,
    removeNotification: () => null,
  }
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout * 1000) // s -> ms
  }
}

export default notificationSlice.reducer