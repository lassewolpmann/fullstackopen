import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import { useState } from "react";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import NavBar from "./components/NavBar.jsx";

const App = () => {
  const [token, setToken] = useState(null)

  return (
    <Router>
      <NavBar token={token} setToken={setToken} />

      <Routes>
        <Route path="/" element={<Authors token={token} /> } />
        <Route path="/books" element={<Books /> } />
        <Route path="/add-book" element={<NewBook token={token} /> } />
        <Route path="login" element={<LoginForm setToken={setToken} /> } />
      </Routes>
    </Router>
  );
};

export default App;
