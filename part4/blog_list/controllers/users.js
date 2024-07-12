const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/userSchema')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
    res.json(users)
})

usersRouter.post('/', async (req, res) => {
    const { username, password, name } = req.body

    if (password.length < 3) {
        res.status(400).json({ error: 'Password must be at least 3 characters' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        password: passwordHash,
        name
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
})

module.exports = usersRouter