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

app.get('/info', (request, response) => {
    const total_people = phonebookEntry.length
    const date = new Date()

    response.send(`<p>Phonebook has info for ${total_people} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebookEntry.findById(id)
        .then(entry => {
            if (entry) {
                response.json(entry)
            } else {
                response.status(404).end()
            }
        })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    phonebookEntry.deleteOne({ _id: id } )
        .then(request => {
            console.log("Delete entry with ID: ", id)
        })

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
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
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})