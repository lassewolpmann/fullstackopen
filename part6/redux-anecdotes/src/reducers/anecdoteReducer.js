import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers: {
        createAnecdote: (state, action) => state.push(asObject(action.payload)),
        appendAnecdote: (state, action) => state.push(action.payload),
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
    createAnecdote,
    appendAnecdote,
    setAnecdotes,
    voteFor
} = anecdoteSlice.actions
export default anecdoteSlice.reducer