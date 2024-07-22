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
        <div style={blogStyle} className='blog'>
            <p>
                <span data-testid="blog-title">{blog.title}</span> <span data-testid="blog-author">{blog.author}</span>
                <button onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
            </p>
            {showDetails && <p data-testid="blog-url">{blog.url}</p>}
            {showDetails && <p data-testid="blog-likes">likes {blog.likes} <button onClick={likeBlogPost}>like</button></p>}
            {showDetails && <p data-testid="blog-user">{blog.user.name}</p>}
            {(user.username === blog.user.username) && <button onClick={deletePost}>delete</button>}
        </div>
    )
}

export default Blog