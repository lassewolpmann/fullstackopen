import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { initializeBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer.js";
import { loginUser, logoutUser } from "./reducers/userReducer.js";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Toggleable from "./components/Toggleable";

import blogService from "./services/blogs";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector(state => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      blogService.setToken(user.token);
    }
  }, [user]);

  const handleLogin = async (userObject) => {
    const username = userObject.username;
    const password = userObject.password;

    console.log("logging in with", username, password);

    dispatch(loginUser(userObject))
  };

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  };

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    dispatch(createBlog(blogObject))
  };

  const likeBlogPost = async (blog) => {
    dispatch(likeBlog(blog))
  };

  const deleteBlogPost = async (blog) => {
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`);

    if (confirmation) {
      dispatch(deleteBlog(blog))
    }
  };

  if (user === null) {
    return (
      <>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </>
    );
  } else {
    return (
      <div>
        <h2>blogs</h2>
        <Notification />
        <p>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </p>

        <Toggleable buttonLabel="new blog post" ref={blogFormRef}>
          <NewBlogForm newBlog={newBlog} />
        </Toggleable>

        {[...blogs]
          .sort((a, b) => {
            if (a.likes > b.likes) {
              return -1;
            } else if (a.likes < b.likes) {
              return 1;
            } else {
              return 0;
            }
          })
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              likeBlogPost={() => likeBlogPost(blog)}
              deleteBlogPost={() => deleteBlogPost(blog)}
            />
          ))}
      </div>
    );
  }
};

export default App;
