import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        appendAnecdote: (state, action) => {
            state.push(action.payload)
        },
        setAnecdotes: (state, action) => action.payload,
        voteFor(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes + 1}
            return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
        }
    }
})

export const {
    appendAnecdote,
    setAnecdotes,
    voteFor
} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const createAnecdote = content => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(appendAnecdote(newAnecdote))
    }
}

export const voteForAnecdote = anecdote => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.update(anecdote)
        dispatch(voteFor(updatedAnecdote.id))
    }
}

export default anecdoteSlice.reducer