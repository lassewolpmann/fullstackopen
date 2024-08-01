import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs.js'
import { setNotification } from "./notificationReducer.js";

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog: (state, action) => {
      state.push(action.payload)
    },
    removeBlog: (state, action) => {
      console.log(state, action)
    },
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

export const createBlog = (blogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject);
    dispatch(appendBlog(newBlog));
    dispatch(setNotification({ message: `Added new blog: ${newBlog.title} by ${newBlog.author}`, status: "success" }, 5))
  }
}

export const likeBlog = (blogObject) => {
  return async dispatch => {
    await blogService.likePost(blogObject.id, blogObject.likes + 1);
    dispatch(initializeBlogs())
  }
}

export const deleteBlog = (blogObject) => {
  return async dispatch => {
    await blogService.deletePost(blogObject.id);
    dispatch(initializeBlogs())
    dispatch(setNotification({ message: `Removed blog: ${blogObject.title} by ${blogObject.author}`, status: "success" }, 5))
  }
}

export default blogSlice.reducer