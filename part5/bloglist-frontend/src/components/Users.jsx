import { useEffect, useState } from "react";
import usersService from "../services/users.js"

const Users = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    usersService.getAll()
      .then(res => setUsers(res))
  }, [])

  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
        <tr>
          <td></td>
          <td><b>blogs created</b></td>
        </tr>
        {users.map((user) => (
          <tr key={user.name}>
            <td>{user.name}</td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users