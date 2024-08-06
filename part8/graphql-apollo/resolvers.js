const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const Book = require("./models/book");
const Author = require("./models/author");
const { GraphQLError } = require("graphql/error");
const User = require("./models/user");
const jwt = require("jsonwebtoken");

const resolvers = {
  Author: {
    bookCount: async (root) => {
      const id = root.id
      const books = await Book.find({ author: id })

      return books.length
    }
  },
  Book: {
    author: async (root) => {
      return Author.findById(root.author)
    }
  },
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: args.author })
      const genre = args.genre

      if (args.author && !author) {
        // Author parameter was given, but no Author was found
        return []
      }

      return Book.find({
        author: author ? author._id : { $exists: true },
        genres: genre ? genre : { $exists: true }
      })
    },
    allAuthors: async () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    },
    genres: async () => {
      const books = await Book.find({})
      const genres = books.flatMap(book => book.genres)
      return [...new Set(genres)]
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const author = await Author.findOne({ name: args.author })
      let id = ''

      if (!author) {
        // Create new Author

        const newAuthor = new Author({
          name: args.author
        })

        try {
          const res = await newAuthor.save()
          id = res._id
        } catch (error) {
          throw new GraphQLError('Creating new Author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      } else {
        id = author._id
      }

      const book = new Book({
        title: args.title,
        published: Number(args.published),
        author: id,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Adding Book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('wrong credentials', {
          extensions: { code: 'BAD_USER_INPUT' }
        })
      }

      const name = args.name
      const year = args.setBornTo

      const query = { name: name }

      return Author.findOneAndUpdate(query, {
        born: year
      })
    },
    createUser: async (root, args) => {
      const user = new User({ ...args })

      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.username,
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }

      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },

  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
    }
  }
}

module.exports = resolvers