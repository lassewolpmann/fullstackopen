import { useState } from 'react'

import blogService from '../services/blogs'

const Blog = ({ blog, setBlogs, user }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetails, setShowDetails] = useState(false)

    const visible = { display: showDetails ? '' : 'none' }
    const buttonVisible = { display: user.username === blog.user.username ? '' : 'none' }

    const likeBlogPost = async () => {
        try {
            await blogService.likePost(blog.id, blog.likes + 1)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
        } catch (e) {
            console.log(e)
        }
    }

    const deletePost = async () => {
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

    return (
        <div style={blogStyle}>
            <p>{blog.title} {blog.author}
                <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
            </p>
            <p style={visible}>{blog.url}</p>
            <p style={visible}>likes {blog.likes} <button onClick={likeBlogPost}>like</button></p>
            <p style={visible}>{blog.author}</p>
            <button style={buttonVisible} onClick={deletePost}>delete</button>
        </div>
    )
}

export default Blog