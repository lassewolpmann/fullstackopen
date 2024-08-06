import { useQuery } from '@apollo/client'
import { ALL_BOOKS, GET_ME } from "../queries.js";
import { useEffect, useState } from "react";

const Recommended = ({ token }) => {
  const [ favouriteGenre, setFavouriteGenre ] = useState('')

  const userResult = useQuery(GET_ME, {
    context: {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
  })

  const booksResult = useQuery(ALL_BOOKS, {
    variables: {
      genre: userResult.loading ? null : favouriteGenre
    }
  })

  useEffect(() => {
    if (!userResult.loading) {
      const { me } = userResult.data
      setFavouriteGenre(me.favoriteGenre)
    }
  }, [userResult])

  if (userResult.loading || booksResult.loading) {
    return <div>loading...</div>
  }

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