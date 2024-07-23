import { useState } from 'react'

const Blog = ({ blog, user, likeBlogPost, deleteBlogPost }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const [showDetails, setShowDetails] = useState(false)

    return (
        <div style={blogStyle} className='blog' data-testid={blog.title}>
            <p>
                <span className="blogTitle">{blog.title}</span> <span className="blogAuthor">{blog.author}</span>
                <button className="blogDetailsButton" onClick={() => setShowDetails(!showDetails)}>{showDetails ? 'hide' : 'show'}</button>
            </p>
            {showDetails && <p className="blogURL">{blog.url}</p>}
            {showDetails && <p className="blogLikes">likes {blog.likes} <button className="blogLikeButton" onClick={likeBlogPost}>like</button></p>}
            {showDetails && <p className="blogUser">{blog.user.name}</p>}
            {(user.username === blog.user.username) && <button onClick={deleteBlogPost}>delete</button>}
        </div>
    )
}

export default Blog