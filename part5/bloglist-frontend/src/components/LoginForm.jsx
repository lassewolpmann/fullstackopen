import { useState } from 'react'
import PropTypes from 'prop-types'

import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification.jsx'

const LoginForm = ({
    setUser,
    message,
    setMessage,
    messageStatus,
    setMessageStatus
}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log('logging in with', username, password)

        try {
            const user = await loginService.login({
                username, password,
            })

            window.localStorage.setItem(
                'loggedBlogAppUser', JSON.stringify(user)
            )

            setUser(user)
            blogService.setToken(user.token)
            setUsername('')
            setPassword('')
            setMessage(`Logged in as ${user.username}`)
            setMessageStatus('success')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        } catch (exception) {
            setMessage('Wrong credentials')
            setMessageStatus('error')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    return (
        <div>
            <h2>Log in to application</h2>
            <Notification message={message} className={messageStatus} />
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input
                        type="text"
                        value={username}
                        name="Username"
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    password
                    <input
                        type="password"
                        value={password}
                        name="Password"
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <button type="submit">login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    setUser: PropTypes.func.isRequired,
    message: PropTypes.string,
    setMessage: PropTypes.func.isRequired,
    messageStatus: PropTypes.string.isRequired,
    setMessageStatus: PropTypes.func.isRequired
}
export default LoginForm