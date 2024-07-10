const { test, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

test('6 notes are returned as json', async () => {
    const res = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    const blogs = res.body
    assert.strictEqual(blogs.length, 6)
})

after(async () => {
    await mongoose.connection.close()
})