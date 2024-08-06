import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useState } from "react";
import { useQuery, useMutation, useSubscription } from '@apollo/client'
import { BOOK_ADDED } from "./queries.js";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar.jsx";
import Recommended from "./components/Recommended.jsx";

const App = () => {
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const { bookAdded } = data.data
      window.alert(`Book ${bookAdded.title} added`)
    }
  })

  return (
    <Router>
      <NavBar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Authors token={token} /> } />
        <Route path="/books" element={<Books /> } />
        <Route path="/add-book" element={<NewBook token={token} /> } />
        <Route path="/recommended" element={<Recommended token={token} /> } />
        <Route path="login" element={<LoginForm setToken={setToken} /> } />
      </Routes>
    </Router>
  );
};

export default App;
