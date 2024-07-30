import { useSelector, useDispatch } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return [...anecdotes]
            .sort((a, b) => a.votes > b.votes ? -1 : 1)
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = (anecdote) => {
        dispatch(voteForAnecdote(anecdote))
        dispatch(setNotification(`voted for ${anecdote.content}`, 5))
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
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList