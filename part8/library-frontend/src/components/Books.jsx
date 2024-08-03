import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from "../queries.js";
import { useState } from "react";


const Books = () => {
  const result = useQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')

  if (result.loading) {
    return <div>loading...</div>
  }

  let genres = result.data.allBooks.flatMap(book => book.genres)
  genres = [...new Set(genres)]
  const books = result.data.allBooks.filter((book) => {
    if (genre === '') { return true }
    return book.genres.includes(genre)
  })

  return (
    <div>
      <h2>books</h2>

      <p>selected genre: {genre}</p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.map(genre => (
        <button key={genre} onClick={() => setGenre(genre)}>{genre}</button>
      ))}
      <button onClick={() => setGenre('')}>clear filter</button>
    </div>
  )
}

export default Books
