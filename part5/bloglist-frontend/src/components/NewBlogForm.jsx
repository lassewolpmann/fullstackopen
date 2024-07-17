const NewBlogForm = ({
    newBlog,
    blogTitle,
    setBlogTitle,
    blogAuthor,
    setBlogAuthor,
    blogURL,
    setBlogURL
}) => {
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={newBlog}>
                <div>
                    title:
                    <input
                        type="text"
                        value={blogTitle}
                        name="Blog Title"
                        onChange={({ target }) => setBlogTitle(target.value)}
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={blogAuthor}
                        name="Blog Author"
                        onChange={({ target }) => setBlogAuthor(target.value)}
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={blogURL}
                        name="Blog URL"
                        onChange={({ target }) => setBlogURL(target.value)}
                    />
                </div>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default NewBlogForm