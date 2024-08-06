import { gql } from '@apollo/client'

export const CREATE_BOOK = gql`
mutation AddBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    title
    author {
      name
    }
    published
    genres
    id
  }
}
`

export const ALL_BOOKS = gql`
query AllBooks($genre: String, $author: String) {
  allBooks(genre: $genre, author: $author) {
    title
    author {
      name
    }
    published
    genres
  }
}
`

export const ALL_AUTHORS = gql`
query {
  allAuthors {
    name
    born
    bookCount
  }
}
`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
}
`

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`

export const GET_ME = gql`
query Me {
  me {
    username
    favoriteGenre
    id
  }
}
`

export const ALL_GENRES = gql`
query Query {
  genres
}
`