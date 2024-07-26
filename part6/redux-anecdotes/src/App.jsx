import { useSelector, useDispatch } from 'react-redux'
import { voteFor, createAnecdote } from './reducers/anecdoteReducer'

const App = () => {
    const anecdotes = useSelector(state => state.sort((a, b) => a.votes < b.votes))
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(voteFor(id))
    }

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        if (content !== '') { dispatch(createAnecdote(content)) }
    }

    return (
        <div>
            <h2>Anecdotes</h2>
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
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote" />
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default App