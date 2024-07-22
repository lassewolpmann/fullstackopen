import { useState } from 'react'

const NewBlogForm = ({ newBlog }) => {
    const [blogTitle, setBlogTitle] = useState('')
    const [blogAuthor, setBlogAuthor] = useState('')
    const [blogURL, setBlogURL] = useState('')

    const addBlog = (event) => {
        event.preventDefault()
        newBlog({
            title: blogTitle,
            author: blogAuthor,
            url: blogURL
        })

        setBlogTitle('')
        setBlogAuthor('')
        setBlogURL('')
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={blogTitle}
                        name="Blog Title"
                        onChange={({ target }) => setBlogTitle(target.value)}
                        placeholder="write blog title here"
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={blogAuthor}
                        name="Blog Author"
                        onChange={({ target }) => setBlogAuthor(target.value)}
                        placeholder="write blog author here"
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={blogURL}
                        name="Blog URL"
                        onChange={({ target }) => setBlogURL(target.value)}
                        placeholder="write blog url here"
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default NewBlogForm