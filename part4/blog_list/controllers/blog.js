const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
    })
    const res = await blog.save()
    response.status(201).json(res)
})

module.exports = blogRouter