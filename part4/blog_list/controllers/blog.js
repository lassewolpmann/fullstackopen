const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body
    const user = request.user

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user.id
    })
    const res = await blog.save()
    user.blogs = user.blogs.concat(res._id)
    await user.save()

    response.status(201).json(res)
})

blogRouter.delete('/:id', middleware.userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user
    const blog = await Blog.findById(request.params.id)

    if (blog.user.toString() === user._id.toString()) {
        await Blog.findByIdAndDelete(blog._id)
        response.status(204).end()
    } else {
        return response.status(401).json({ error: 'user not authorized' })
    }
})

blogRouter.put('/:id', async (request, response) => {
    const { likes } = request.body
    const id = request.params.id
    const res = await Blog.findByIdAndUpdate(id, { likes }, { new: true, runValidators: true, context: 'query' })

    response.json(res)
})

module.exports = blogRouter