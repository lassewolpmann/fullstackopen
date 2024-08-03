import { useState } from "react";
import { LOGIN } from "../queries.js";
import { useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom'

const LoginForm = ({ setToken }) => {
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login ] = useMutation(LOGIN)

  const submit = async (event) => {
    event.preventDefault()
    const res = await login({
      variables: {
        username: username,
        password: password
      }
    })

    setToken(res.data.login.value)
    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <form onSubmit={submit}>
      <p>username: <input type="text" value={username} onChange={({ target }) => setUsername(target.value)}></input></p>
      <p>password: <input type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input></p>
      <button type="submit">login</button>
    </form>
  )
}

export default LoginForm