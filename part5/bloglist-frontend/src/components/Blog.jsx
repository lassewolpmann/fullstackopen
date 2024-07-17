import { useState } from "react";

import blogService from "../services/blogs"

const Blog = ({ blog, blogs, setBlogs }) => {
    const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
    }

    const [showDetails, setShowDetails] = useState(false)

    const visible = { display: showDetails ? '' : 'none' }

    const likeBlogPost = async (event) => {
        event.preventDefault()
        try {
            const res = await blogService.like(blog.id, blog.likes + 1)
            blogService.getAll().then(blogs =>
                setBlogs( blogs )
            )
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <div style={blogStyle}>
        <p>{blog.title} {blog.author}
          <button onClick={() => setShowDetails(!showDetails)}>view</button>
        </p>
        <p style={visible}>{blog.url}</p>
        <p style={visible}>likes {blog.likes} <button onClick={likeBlogPost}>like</button></p>
        <p style={visible}>{blog.author}</p>
        </div>
    )
}

export default Blog