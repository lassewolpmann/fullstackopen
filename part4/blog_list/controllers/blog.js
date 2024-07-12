const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const currentUsers = await User.find({})
    const firstId = currentUsers[0].id
    const user = await User.findById(firstId)

    const body = request.body
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