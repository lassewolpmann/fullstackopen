import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_GENRES } from "../queries.js";
import { useState } from "react";


const Books = () => {
  const [genre, setGenre] = useState('')

  const genresResult = useQuery(ALL_GENRES)
  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: genre
    }
  })

  if (booksResult.loading || genresResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books</h2>

      <p>selected genre: {booksResult.variables.genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksResult.data.allBooks.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genresResult.data.genres.map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre('')}>clear filter</button>
    </div>
  )
}

export default Books
