import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "./reducers/blogReducer.js";
import { loginUser, logoutUser } from "./reducers/userReducer.js";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Toggleable from "./components/Toggleable";

import blogService from "./services/blogs";
import BlogList from "./components/BlogList.jsx";

const App = () => {
  const blogFormRef = useRef();
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

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

        <BlogList />
      </div>
    );
  }
};

export default App;
