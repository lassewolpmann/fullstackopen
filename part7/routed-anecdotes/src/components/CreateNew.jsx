import { useNavigate } from "react-router-dom";
import { useField } from "../hooks/index.js";

const CreateNew = ({ addNew, setNotification }) => {
    const navigate = useNavigate()

    const content = useField('content')
    const author = useField('author')
    const info = useField('info')

    const handleSubmit = (e) => {
        e.preventDefault()
        addNew({
            content: content.value,
            author: author.value,
            info: info.value,
            votes: 0
        })
        setNotification(`a new anecdote ${content} created!`)
        setTimeout(() => {
            setNotification(null)
        }, 5000)
        navigate('/')
    }

    const handleReset = (e) => {
        e.preventDefault()
        content.reset()
        author.reset()
        info.reset()
    }

    return (
        <div>
            <h2>create a new anecdote</h2>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    content
                    <input {...content} />
                </div>
                <div>
                    author
                    <input {...author} />
                </div>
                <div>
                    url for more info
                    <input {...info} />
                </div>
                <button type="submit">create</button>
                <button type="reset">reset</button>
            </form>
        </div>
    )

}

export default CreateNew