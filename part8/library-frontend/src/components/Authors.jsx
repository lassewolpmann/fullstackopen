import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";
import { useEffect, useState } from "react";

const Authors = ({ token }) => {
  const result = useQuery(ALL_AUTHORS)
  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  useEffect(() => {
    if (!result.loading) {
      setName(result.data.allAuthors[0].name)
    }
  }, [result])

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    context: {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    },
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const submit = async (event) => {
    event.preventDefault()

    await editAuthor({
      variables: {
        name: name,
        setBornTo: Number(year)
      }
    })

    setName('')
    setYear('')
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.data.allAuthors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {token ? (
        <form onSubmit={submit}>
          <h3>Set birthyear</h3>
          <select
            value={name}
            onChange={e => setName(e.target.value)}
          >
            {result.data.allAuthors.map((author) => (
              <option value={author.name} key={author.name}>{author.name}</option>
            ))}
          </select>
          <p>year: <input type="text" value={year} onChange={({ target }) => setYear(target.value)} /></p>
          <button type="submit">update author</button>
        </form>
      ): null}
    </div>
  )
}

export default Authors
