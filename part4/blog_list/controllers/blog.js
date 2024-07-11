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

blogRouter.delete('/:id', async (request, response) => {
    const id = request.params.id
    const res = await Blog.findByIdAndDelete(id)

    response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const id = request.params.id
    const res = await Blog.findByIdAndUpdate(id, { likes }, { new: true, runValidators: true, context: 'query' })

    response.json(res)
})

module.exports = blogRouter