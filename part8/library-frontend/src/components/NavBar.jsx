import { Link, useNavigate } from "react-router-dom";

const NavBar = ({ token, setToken }) => {
  const navigate = useNavigate()

  const padding = {
    padding: 5
  }

  const logout = () => {
    setToken(null)
    navigate('/')
  }

  return (
    <div>
      <Link style={padding} to="/">authors</Link>
      <Link style={padding} to="/books">books</Link>
      {token ? (
        <>
          <Link style={padding} to="/add-book">add book</Link>
          <Link style={padding} to="/recommended">recommended</Link>
          <button onClick={logout}>logout</button>
        </>
      ) : (
        <Link style={padding} to="/login">login</Link>
      )}
    </div>
  )
}

export default NavBar