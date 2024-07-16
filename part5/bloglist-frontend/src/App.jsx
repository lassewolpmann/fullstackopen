import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogURL, setBlogURL] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

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
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
  }

  const newBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlog = await blogService.create({
        title: blogTitle, author: blogAuthor, url: blogURL
      })

      console.log(newBlog)

      setBlogs(blogs.concat(newBlog))
      setBlogTitle('')
      setBlogAuthor('')
      setBlogURL('')
    } catch (e) {
      console.log(e)
    }
  }

  if (user === null) {
    return (
        <div>
          <h2>Log in to application</h2>
          <form onSubmit={handleLogin}>
            <div>
              username
              <input
                  type="text"
                  value={username}
                  name="Username"
                  onChange={({target}) => setUsername(target.value)}
              />
            </div>
            <div>
              password
              <input
                  type="password"
                  value={password}
                  name="Password"
                  onChange={({target}) => setPassword(target.value)}
              />
            </div>
            <button type="submit">login</button>
          </form>
        </div>
    )
  }

  return (
      <div>
        <h2>blogs</h2>
        <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>
        {blogs.map(blog =>
            <Blog key={blog.id} blog={blog}/>
        )}

        <h2>create new</h2>
        <form onSubmit={newBlog}>
          <div>
            title:
            <input
                type="text"
                value={blogTitle}
                name="Blog Title"
                onChange={({target}) => setBlogTitle(target.value)}
            />
          </div>
          <div>
            author:
            <input
                type="text"
                value={blogAuthor}
                name="Blog Author"
                onChange={({target}) => setBlogAuthor(target.value)}
            />
          </div>
          <div>
            url:
            <input
                type="text"
                value={blogURL}
                name="Blog URL"
                onChange={({target}) => setBlogURL(target.value)}
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
  )
}

export default App