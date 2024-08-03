const Book = require('../models/book')

const bookCount =  async (root) => {
  const id = root.id
  const books = await Book.find({ author: id })

  return books.length
}

export default bookCount