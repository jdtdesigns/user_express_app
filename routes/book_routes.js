const router = require('express').Router();
const { Op } = require('sequelize');

const Book = require('../models/Book');
const User = require('../models/User');

// POST Route to create a book
router.post('/books', async (requestObj, responseObj) => {
  try {
    const book = await Book.create(requestObj.body);

    responseObj.json(book);
  } catch (err) {
    console.log(err);

    responseObj.json({
      error: 500,
      message: 'There was an error in storing the book.'
    });
  }
});

// GET Route to get a book by id
router.get('/book/:id', async (requestObj, responseObj) => {
  const book_id = requestObj.params.id;

  const book = await Book.findByPk(book_id);

  if (book) {
    return responseObj.json(book);
  }

  responseObj.status(400).json({
    message: 'A book with that ID could not be found.'
  });
});

// GET Route to get all books with the attached associated User
router.get('/books', async (requestObj, responseObj) => {
  const books = await Book.findAll({
    include: {
      model: User,
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt']
      }
    }
  });

  responseObj.json(books);
});

// GET Route to get a single book by title
router.get('/books/search', async (requestObj, responseObj) => {
  try {
    const searchQuery = requestObj.query.title;

    const books = await Book.findAll({
      where: {
        title: {
          [Op.like]: `%${searchQuery}%`
        }
      }
    });

    if (!books.length) {
      return responseObj.json({
        error: 404,
        message: 'No book found by that title.'
      });
    }

    responseObj.json(books);
  } catch (err) {
    console.log(err);

    responseObj.json({
      error: 400,
      message: 'There was an error searching for that book.'
    })
  }
});

// DELETE Route that deletes a book from the books table
router.delete('/book/:id', async (requestObj, responseObj) => {
  const book_id = requestObj.params.id;

  try {
    await Book.destroy({
      where: {
        id: book_id
      }
    });

    responseObj.json({
      message: 'Book deleted successfully!'
    });
  } catch (err) {
    console.log(err);

    responseObj.json({
      error: 500,
      message: 'Book could not be deleted.'
    })
  }
});

module.exports = router;