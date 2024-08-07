import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getAnecdotes, updateAnecdote } from "./requests"
import { useNotificationDispatch } from "./components/NotificationContext.jsx";

const App = () => {
    const notificationDispatch = useNotificationDispatch()
    const queryClient = useQueryClient()

    const updateAnecdoteMutation = useMutation({
        mutationFn: updateAnecdote,
        onSuccess: (updatedAnecdote) => {
            const anecdotes = queryClient.getQueryData(['anecdotes'])
            queryClient.setQueryData(['anecdotes'], anecdotes.map(anecdote => {
                return anecdote.id === updatedAnecdote.id ? updatedAnecdote : anecdote
            }))
        }
    })

    const handleVote = (anecdote) => {
        updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1})
        notificationDispatch({ type: "ADD", message: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
            notificationDispatch({ type: "DEL" })
        }, 5000)
    }

    const result = useQuery({
        queryKey: ['anecdotes'],
        queryFn: getAnecdotes,
        retry: 1,
        refetchOnWindowFocus: false
    })

    if (result.isLoading) {
        return <div>loading data...</div>
    } else if (result.isError) {
        return <div>anecdote service not available due to problems in server</div>
    }

    const anecdotes = result.data

    return (
        <div>
            <h3>Anecdote app</h3>

            <Notification />
            <AnecdoteForm />

            {anecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default App
