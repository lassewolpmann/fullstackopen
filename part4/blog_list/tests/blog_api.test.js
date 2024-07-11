const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogSchema')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared blogs')

    for (const blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved')
    }

    console.log('done')
})

test('correct amount of blogs are returned as json', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.strictEqual(res.body.length, helper.initialBlogs.length)
})

test('identifier property is named id', async() => {
    const res = await api.get('/api/blogs')
    const blogs = res.body

    for (const blog of blogs) {
        const keys = Object.keys(blog)
        assert(keys.includes('id'))
    }
})

test('create new blog entry', async () => {
    const newBlogPost = {
        title: 'Test Blog Post 3',
        author: 'Test Author 3',
        url: 'test',
        likes: 333
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const newestBlog = blogsAfterPost[blogsAfterPost.length - 1]
    assert.deepStrictEqual(newBlogPost.title, newestBlog.title)
    assert.deepStrictEqual(newBlogPost.author, newestBlog.author)
    assert.deepStrictEqual(newBlogPost.url, newestBlog.url)
    assert.deepStrictEqual(newBlogPost.likes, newestBlog.likes)

    assert.strictEqual(blogsAfterPost.length, helper.initialBlogs.length + 1)
})

test('missing likes property', async () => {
    const newBlogPost = {
        title: 'Test Blog Post 3',
        author: 'Test Author 3',
        url: 'test'
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await helper.blogsInDb()
    const newestBlog = blogsAfterPost[blogsAfterPost.length - 1]
    assert.deepStrictEqual(newestBlog.likes, 0)
})

test('missing title or url property', async () => {
    const newBlogPost = {
        likes: 10
    }

    await api
        .post('/api/blogs')
        .send(newBlogPost)
        .expect(400)
})

test('delete blog post with ID', async() => {
    let blogsBeforeDeletion = await helper.blogsInDb()
    let id = blogsBeforeDeletion[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    let blogsAfterDeletion = await helper.blogsInDb()

    assert.deepStrictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length - 1)
})

after(async () => {
    await mongoose.connection.close()
})