import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_ME } from "../queries.js";

const Recommended = ({ token }) => {
  const userResult = useQuery(GET_ME, {
    context: {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  })

  const bookResult = useQuery(ALL_BOOKS)

  if (userResult.loading || bookResult.loading) {
    return <div>loading...</div>
  }

  const favouriteGenre = userResult.data.me.favoriteGenre
  const favouriteBooks = bookResult.data.allBooks.filter(book => book.genres.includes(favouriteGenre))

  return (
    <div>
      <h2>books in your favourite genre <i>{favouriteGenre}</i></h2>
      <table>
        <tbody>
        <tr>
          <th></th>
          <th>author</th>
          <th>published</th>
        </tr>
        {favouriteBooks.map((book) => (
          <tr key={book.title}>
            <td>{book.title}</td>
            <td>{book.author.name}</td>
            <td>{book.published}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommended