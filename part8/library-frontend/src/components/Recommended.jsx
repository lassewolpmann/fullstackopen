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

  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: userResult.loading ? null : userResult.data.me.favoriteGenre
    }
  })

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>books in your favourite genre <i>{userResult.data.me.favoriteGenre}</i></h2>
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
    </div>
  )
}

export default Recommended