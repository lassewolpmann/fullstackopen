import { useParams } from "react-router-dom";

const Anecdote = ({ anecdoteById }) => {
    const id = useParams().id
    const anecdote = anecdoteById(Number(id))

    return (
        <div>
            <h2>{anecdote.content} by {anecdote.author}</h2>
            <p>has {anecdote.votes} votes</p>
            <p>for more info see {anecdote.info}</p>
        </div>
    )
}

export default Anecdote