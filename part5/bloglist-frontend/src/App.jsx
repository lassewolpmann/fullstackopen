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

import { styled } from "styled-components";

const Wrapper = styled.section`
    display: flex;
    flex-direction: column;
      
    font-size: 1.2rem;
    padding: 20px;
    font-family: Verdana, serif;
    
    button {
        background: #ccc;
        border-radius: 3px;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.1s ease;
        font-size: 0.8rem;
        width: max-content;

        &:hover {
            background: #aaa;
        }
    }

    a {
        color: inherit;
        text-decoration: none;
        transition: color 0.1s ease;
    }

    a:hover {
        color: #aaa
    }

    input {
        padding: 10px;
        border-radius: 5px;
        border: none;
        background: #efefef;
    }
    
    form {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 10px;
        width: max-content;

        div {
            display: flex;
            flex-direction: row;
            align-items: center;
            gap: 30px;
            justify-content: space-between;
            width: 100%;
        }
    }
  `

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
      <Wrapper>
        <Notification />
        <LoginForm handleLogin={handleLogin} />
      </Wrapper>
    );
  } else {
    return (
      <Router>
        <Wrapper>
          <Notification />
          <NavBar />

          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/:id" element={<Blog />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </Wrapper>
      </Router>
    );
  }
};

export default App;
