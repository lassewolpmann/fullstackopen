import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { loginUser, logoutUser } from "./reducers/userReducer.js";

import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import BlogList from "./components/BlogList.jsx";
import Blog from "./components/Blog.jsx";
import Users from "./components/Users.jsx";

import blogService from "./services/blogs";
import User from "./components/User.jsx";
import NavBar from "./components/NavBar.jsx";

const App = () => {
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

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </div>
    );
  } else {
    return (
      <Router>
        <Notification />
        <NavBar />

        <h2>blog app</h2>

        <Routes>
          <Route path="/" element={<BlogList />} />
          <Route path="/:id" element={<Blog />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
        </Routes>
      </Router>
    );
  }
};

export default App;
