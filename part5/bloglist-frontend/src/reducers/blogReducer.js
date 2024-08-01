import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    removeBlog: (state, action) => console.log(state, action),
    setBlogs: (state, action) => {
      return action.payload
    }
  }
})

export const { appendBlog, removeBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export default blogSlice.reducer