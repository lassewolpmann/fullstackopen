import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login.js"
import { setNotification } from "./notificationReducer.js";
import blogService from "../services/blogs.js";

const userSlice = createSlice({
  name: 'user',
  initialState: JSON.parse(window.localStorage.getItem("loggedBlogAppUser")),
  reducers: {
    setUser: (state, action) => {
      return action.payload
    }
  }
})

export const { setUser } = userSlice.actions

export const loginUser = ({ username, password }) => {
  return async dispatch => {
    try {
      const user = await loginService.login({
        username,
        password,
      });
      dispatch(setUser(user))

      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      dispatch(setNotification({ message: `Logged in as ${user.username}`, status: "success" }, 5))
    } catch (e) {
      dispatch(setNotification({ message: "Wrong credentials", status: "error" }, 5))
    }
  }
}

export const logoutUser = () => {
  return async dispatch => {
    dispatch(setUser(null))
    blogService.setToken(null)
    window.localStorage.removeItem("loggedBlogAppUser");
    dispatch(setNotification({ message: "Logged out", status: "success" }, 5))
  }
}

export default userSlice.reducer