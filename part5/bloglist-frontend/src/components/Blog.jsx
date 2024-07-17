import { useState } from "react";

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [showDetails, setShowDetails] = useState(false)

  const visible = { display: showDetails ? '' : 'none' }

  return (
      <div style={blogStyle}>
        <p>{blog.title} {blog.author}
          <button onClick={() => setShowDetails(!showDetails)}>view</button>
        </p>
        <p style={visible}>{blog.url}</p>
        <p style={visible}>likes {blog.likes}</p>
        <p style={visible}>{blog.author}</p>
      </div>
  )
}

export default Blog