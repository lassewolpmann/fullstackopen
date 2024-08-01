import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../reducers/userReducer.js";
import { styled } from "styled-components";

const NavigationBar = styled.div`
    background: #eee;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 0 2px 1px #aaa;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  
    div {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
    }
    
    b {
        background: #111;
        color: #eee;
        padding: 5px 10px;
        border-radius: 5px;
        margin-right: 10px;
    }
    
    button {
        margin-left: 10px;
    }
`

const NavBar = () => {
  const padding = {
    padding: 5
  }

  const user = useSelector(state => state.user)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    dispatch(logoutUser())
  };

  return (
    <NavigationBar>
      <div>
        <b>blog app</b>
        <Link style={padding} to="/">blogs</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
      <div>
        <span><i>{user.name}</i> logged in</span>
        <button onClick={handleLogout}>logout</button>
      </div>

    </NavigationBar>
  )
}

export default NavBar