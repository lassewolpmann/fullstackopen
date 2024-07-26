import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        const filtered = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
        return filtered.sort((a, b) => a.votes < b.votes)
    })
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
    }

    return (
        <>
            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList