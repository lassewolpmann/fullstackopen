import { useDispatch } from 'react-redux'
import { appendAnecdote } from "../reducers/anecdoteReducer"
import { setNotification, removeNotification } from "../reducers/notificationReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''

        if (content !== '') {
            const newAnecdote = await anecdoteService.createNew(content)
            dispatch(appendAnecdote(newAnecdote))
            dispatch(setNotification(`created anecdote ${content}`))
            setTimeout(() => {
                dispatch(removeNotification())
            }, 5000)
        }
    }

    return (
        <>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <input name="anecdote"/>
                <button type="submit">create</button>
            </form>
        </>
    )
}

export default AnecdoteForm