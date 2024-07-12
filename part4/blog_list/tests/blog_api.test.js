const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blogSchema')
const User = require('../models/userSchema')
const helper = require('./test_helper')

beforeEach(async () => {
    await Blog.deleteMany({})
    console.log('cleared blogs')

    await User.deleteMany({})
    console.log('cleared users')

    for (const blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
        console.log('saved blog')
    }

    const passwordHash = await bcrypt.hash('secretHash', 10)
    const rootUser = new User({ username: 'root', password: passwordHash, name: 'Superuser' })

    await rootUser.save()
    console.log('saved root user')
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
    assert.strictEqual(newestBlog.likes, 0)
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

test('delete blog post with ID', async () => {
    let blogsBeforeDeletion = await helper.blogsInDb()
    let id = blogsBeforeDeletion[0].id

    await api
        .delete(`/api/blogs/${id}`)
        .expect(204)

    let blogsAfterDeletion = await helper.blogsInDb()

    assert.strictEqual(blogsAfterDeletion.length, blogsBeforeDeletion.length - 1)
})

test('update blog post with ID', async () => {
    let blogsBeforeUpdate = await helper.blogsInDb()
    let blog = blogsBeforeUpdate[0]

    const newBlogPost =  {
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes + 1,
    }

    const res = await api
        .put(`/api/blogs/${blog.id}`)
        .send(newBlogPost)

    assert.strictEqual(res.body.likes, newBlogPost.likes)
})

test('creating new user', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'lwolpmann',
        password: 'secretpassword',
        name: 'Lasse Wolpmann'
    }

    await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    assert(usernames.includes(newUser.username))
})

test('test non-unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: usersAtStart[0].username,
        password: 'secretpassword',
        name: usersAtStart[0].name
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('expected `username` to be unique'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('password too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
        username: 'insecureUser',
        password: 'ab'
    }

    const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert(result.body.error.includes('Password must be at least 3 characters'))

    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

after(async () => {
    await mongoose.connection.close()
})