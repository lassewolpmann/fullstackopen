import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer.js";

const NavBar = () => {
  const padding = {
    padding: 5
  }

  const navBarStyle = {
    background: "lightgray",
    padding: 5
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  };

  return (
    <div style={navBarStyle}>
      <Link style={padding} to="/">blogs</Link>
      <Link style={padding} to="/users">users</Link>
      {user.name} logged in <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default NavBar