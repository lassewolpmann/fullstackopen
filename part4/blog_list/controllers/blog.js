const blogRouter = require('express').Router()
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
        return authorization.replace('Bearer ', '')
    }
    return null
}

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1, id: 1 })
    response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body
    const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: 'token invalid' })
    }
    const user = await User.findById(decodedToken.id)

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