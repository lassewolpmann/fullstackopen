import { Link } from 'react-router-dom'

const AnecdoteList = ({ anecdotes }) => (
    <div>
        <h2>Anecdotes</h2>
        <ul>
            {anecdotes.map(anecdote =>
                <Link key={anecdote.id} to={`/${anecdote.id}`}>
                    <li key={anecdote.id}>{anecdote.content}</li>
                </Link>
            )}
        </ul>
    </div>
)

export default AnecdoteList