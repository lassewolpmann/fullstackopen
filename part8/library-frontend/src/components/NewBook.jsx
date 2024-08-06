import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { CREATE_BOOK, ALL_BOOKS } from "../queries.js";


const NewBook = ({ token }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK, {
    context: {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
    update: (cache, response) => {
      const { addBook } = response.data
      cache.updateQuery({
        query: ALL_BOOKS,
        variables: {
          // This HAS to be set as the same initial state value as in Books.jsx, since the cached query also uses an empty string for genre
          genre: ''
        }
      }, (data) => {
        if (!data) return { undefined }
        return {
          allBooks: data.allBooks.concat(addBook)
        }
      })
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    await createBook({
      variables: {
        title: title,
        author: author,
        published: Number(published),
        genres: genres
      }
    })

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <h2>add book</h2>

      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(" ")}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook