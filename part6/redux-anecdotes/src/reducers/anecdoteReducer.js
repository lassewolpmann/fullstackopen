import { createSlice } from '@reduxjs/toolkit'

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
export default anecdoteSlice.reducer