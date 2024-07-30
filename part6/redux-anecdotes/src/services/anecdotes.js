import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const res = await axios.get(baseUrl)
    return res.data
}

const createNew = async (content) => {
    const anecdote = {
        content,
        votes: 0
    }

    const res = await axios.post(baseUrl, anecdote)
    return res.data
}

const update = async (anecdote) => {
    const updated = {...anecdote, votes: anecdote.votes + 1}
    const res = await axios.put(`${baseUrl}/${anecdote.id}`, updated)
    return res.data
}

export default {
    getAll,
    createNew,
    update
}