import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes, filter }) => {
        return [...anecdotes]
            .sort((a, b) => a.votes > b.votes ? -1 : 1)
            .filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    })

    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(voteFor(id))
        dispatch(setNotification(`voted for ${content}`))
        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}
        </>
    )
}

export default AnecdoteList