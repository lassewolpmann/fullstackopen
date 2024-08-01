import { useEffect } from "react";
import { Link } from "react-router-dom";
import { initializeUsers } from "../reducers/usersReducer.js";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";

const UserDiv = styled.div`
    table {
        border-spacing: 1em 0.5em;
        border-collapse: collapse;
        background: #eee;
        border-radius: 5px;
        
        td {
            padding: 10px;
        }
        
        thead {
            font-weight: bold;
            
            td {
                border-bottom: 1px solid #bbb;
            }
        }
        
        tbody {
            tr:nth-child(2n-1) {
                td {
                    background: #ddd;
                }
            }
            
            tr:last-child {
                td:first-child {
                    border-radius: 0 0 0 5px;
                }
                
                td:last-child {
                    border-radius: 0 0 5px 0;
                }
            }
        }
    }
`

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  const users = useSelector(state => state.users)

  return (
    <UserDiv>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <td>name</td>
            <td>blogs created</td>
          </tr>
        </thead>
        <tbody>
        {[...users].map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </UserDiv>
  )
}

export default Users