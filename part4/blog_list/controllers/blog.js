const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const res = blog.save()
    response.status(201).json(res)
})

module.exports = blogRouter