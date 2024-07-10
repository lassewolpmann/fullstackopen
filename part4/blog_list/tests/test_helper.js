const Blog = require('../models/blogSchema')

const initialBlogs = [
    {
        title: 'Test Blog Post 1',
        author: 'Test Author 1',
        url: 'test',
        likes: 999
    },
    {
        title: 'Test Blog Post 2',
        author: 'Test Author 2',
        url: 'test',
        likes: 111
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs,
    blogsInDb
}