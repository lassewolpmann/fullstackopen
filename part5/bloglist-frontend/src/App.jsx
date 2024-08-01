import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notificationReducer.js";
import { initializeBlogs, appendBlog } from "./reducers/blogReducer.js";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import NewBlogForm from "./components/NewBlogForm";
import Toggleable from "./components/Toggleable";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useDispatch()


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch]);

  const blogs = useSelector((state) => state.blogs)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (userObject) => {
    const username = userObject.username;
    const password = userObject.password;

    console.log("logging in with", username, password);

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));

      setUser(user);
      blogService.setToken(user.token);

      dispatch(setNotification({ message: `Logged in as ${user.username}`, status: "success" }, 5))
    } catch (exception) {
      dispatch(setNotification({ message: "Wrong credentials", status: "error" }, 5))
    }
  };

  const handleLogout = (event) => {
    event.preventDefault();
    window.localStorage.removeItem("loggedBlogAppUser");
    setUser(null);
    blogService.setToken(null);
    dispatch(setNotification({ message: "Logged out", status: "success" }, 5))
  };

  const newBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      const newBlog = await blogService.create(blogObject);
      console.log(newBlog)
      dispatch(appendBlog(newBlog))
      dispatch(setNotification({ message: `Added new blog: ${newBlog.title} by ${newBlog.author}`, status: "success" }, 5))
    } catch (e) {
      dispatch(setNotification({ message: `Error adding new blog: ${e.response.data.error}`, status: "error" }, 5))
    }
  };

  const likeBlogPost = async (blog) => {
    console.log("like")

    /*
    try {
      await blogService.likePost(blog.id, blog.likes + 1);
      blogService.getAll().then((blogs) => setBlogs(blogs));
    } catch (e) {
      console.log(e);
    }

     */
  };

  const deleteBlogPost = async (blog) => {
    console.log("delete")

    /*
    const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`);

    if (confirmation) {
      try {
        await blogService.deletePost(blog.id);
        blogService.getAll().then((blogs) => setBlogs(blogs));

        dispatch(setNotification({ message: `Removed blog: ${blog.title} by ${blog.author}`, status: "success" }, 5))
      } catch (e) {
        dispatch(setNotification({ message: `Error removing blog: ${e.response.data.error}`, status: "error" }, 5))
      }
    }

     */
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
