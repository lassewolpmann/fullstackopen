import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import NewBlogForm from './components/NewBlogForm'
import Toggleable from './components/Toggleable'

import blogService from './services/blogs'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [message, setMessage] = useState(null)
    const [messageStatus, setMessageStatus] = useState('')
    const [user, setUser] = useState(null)

    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogURL, setBlogURL] = useState('')

    const blogFormRef = useRef()

    useEffect(() => {
        const fetchBlogs = async () => {
            const fetchedBlogs = await blogService.getAll()
            setBlogs(fetchedBlogs)
        }

        fetchBlogs()
            .catch(console.error)
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogout = (event) => {
        event.preventDefault()
        window.localStorage.removeItem('loggedBlogAppUser')
        setUser(null)
        blogService.setToken(null)
        setMessage('Logged out')
        setMessageStatus('success')
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    }

    const newBlog = async (event) => {
        event.preventDefault()
        blogFormRef.current.toggleVisibility()

        try {
            const newBlog = await blogService.create({
                title: blogTitle, author: blogAuthor, url: blogURL
            })

            setMessage(`Added new blog: ${blogTitle} by ${blogAuthor}`)
            setMessageStatus('success')
            setTimeout(() => {
                setMessage(null)
            }, 5000)

            setBlogs([...blogs, newBlog])
            setBlogTitle('')
            setBlogAuthor('')
            setBlogURL('')
        } catch (e) {
            console.log(e)
            setMessage(`Error adding new blog: ${e.response.data.error}`)
            setMessageStatus('error')
            setTimeout(() => {
                setMessage(null)
            }, 5000)
        }
    }

    const likeBlogPost = async (blog) => {
        try {
            await blogService.likePost(blog.id, blog.likes + 1)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
        } catch (e) {
            console.log(e)
        }
    }

    const deleteBlogPost = async (blog) => {
        const confirmation = confirm(`Remove blog ${blog.title} by ${blog.author}`)

        if (confirmation) {
            try {
                await blogService.deletePost(blog.id)
                blogService.getAll().then(blogs =>
                    setBlogs( blogs )
                )
            } catch (e) {
                console.log(e)
            }
        }
    }

    if (user === null) {
        return <LoginForm
            setUser={setUser}
            message={message}
            setMessage={setMessage}
            messageStatus={messageStatus}
            setMessageStatus={setMessageStatus}
        />
    } else {
        return (
            <div>
                <h2>blogs</h2>
                <Notification message={message} className={messageStatus} />
                <p>{user.username} logged in <button onClick={handleLogout}>logout</button></p>

                <Toggleable buttonLabel="new blog post" ref={blogFormRef}>
                    <NewBlogForm
                        newBlog={newBlog}
                        blogTitle={blogTitle}
                        setBlogTitle={setBlogTitle}
                        blogAuthor={blogAuthor}
                        setBlogAuthor={setBlogAuthor}
                        blogURL={blogURL}
                        setBlogURL={setBlogURL}
                    />
                </Toggleable>

                {blogs
                    .sort((a, b) => {
                        if (a.likes < b.likes) {
                            return -1
                        } else if (a.likes > b.likes) {
                            return 1
                        } else {
                            return 0
                        }
                    })
                    .map(blog =>
                        <Blog
                            key={blog.id}
                            blog={blog}
                            user={user}
                            likeBlogPost={() => likeBlogPost(blog)}
                            deleteBlogPost={() => deleteBlogPost(blog)}
                        />
                    )}
            </div>
        )
    }

}

export default App