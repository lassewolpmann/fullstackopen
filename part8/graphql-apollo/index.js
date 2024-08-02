const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = `
  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }
  
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
  
  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book!,
    
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Author: {
    bookCount: (root) => {
      // return books.filter((book) => book.author === root.name).length
      return 0
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      /*
      const author = args.author
      const genre = args.genre

      let filteredBooks = books

      if (author) {
        filteredBooks = filteredBooks.filter(book => book.author === author)
      }

      if (genre) {
        filteredBooks = filteredBooks.filter(book => book.genres.includes(genre))
      }

       */

      return Book.find({})
    },
    allAuthors: async () => Author.find({})
  },

  Mutation: {
    addBook: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      let id = ''

      if (!author) {
        const newAuthor = new Author({
          name: args.author
        })

        const res = await newAuthor.save()
        id = res._id
      } else {
        id = author._id
      }

      const book = new Book({
        title: args.title,
        published: Number(args.published),
        author: id,
        genres: args.genres
      })

      return book.save()

      /*
      if (!authors.includes(book.author)) {
        const author = {
          name: book.author,
          bookCount: 1,
          id: uuid()
        }

        authors = authors.concat(author)
      }

      return book

       */
    },
    editAuthor: (root, args) => {
      return null

      /*
      const updatedAuthor = { ...author, born: args.setBornTo }
      authors = authors.map((author) => {
        return author.name === args.name ? updatedAuthor : author
      })

      return updatedAuthor
      */
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})