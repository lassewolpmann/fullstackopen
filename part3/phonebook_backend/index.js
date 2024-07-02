require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const phonebookEntry = require('./models/phonebookEntry')

app.use(express.json())
app.use(morgan((tokens, req, res) => {
    if (req.method === 'POST') {
        return [
            tokens.method(req, res),
            tokens.url(req, res),
            tokens.status(req, res),
            tokens.res(req, res, 'content-length'), '-',
            tokens['response-time'](req, res), 'ms',
            JSON.stringify(req.body)
        ].join(' ')
    }
}))
app.use(cors())
app.use(express.static('dist'))



app.get('/', (request, response) => {
    response.send('<h1>Phonebook API</h1>')
})

app.get('/api/persons', (request, response) => {
    phonebookEntry.find({})
        .then(entries => {
            response.json(entries)
        })
})

app.get('/info', (request, response, next) => {
    phonebookEntry.countDocuments({})
        .then(count => {
            const date = new Date()
            response.send(`<p>Phonebook has info for ${count} people</p><p>${date}</p>`)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    phonebookEntry.findById(id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            } else {
                response.status(404).end()
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebookEntry.findByIdAndDelete(id)
        .then(request => {
            console.log("Delete entry with ID: ", id)
        })

    response.status(204).end()
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    if (!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    }

    if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    }

    phonebookEntry.find({})
        .then(entries => {
            let allNames = entries.map(entry => entry.name)

            if (allNames.includes(body.name.toLowerCase())) {
                return response.status(400).json({
                    error: 'name must be unique'
                })
            }

            const person = new phonebookEntry({
                name: body.name,
                number: body.number
            })

            person.save()
                .then(savedPerson => {
                    response.json(savedPerson)
                })
                .catch(error => next(error))
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body
    const id = request.params.id

    phonebookEntry.findByIdAndUpdate(id, { number: number }, { new: true, runValidators: true, context: 'query' })
        .then(updatedPerson => {
            response.json(updatedPerson)
        })
        .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    } else if (error.name === 'ValidationError') {
        return response.status(400).json({ error: error.message })
    }

    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})