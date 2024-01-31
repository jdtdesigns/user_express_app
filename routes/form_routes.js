const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');

// POST - Create a User Route
router.post('/create/user', async (requestObj, responseObj) => {
  try {
    await User.create(requestObj.body);

    responseObj.redirect('/?user_added=true');
  } catch (err) {
    responseObj.redirect('/create/user');
  }
});

// POST - Add a Book Route
router.post('/create/book', async (requestObj, responseObj) => {
  try {
    await Book.create(requestObj.body);

    responseObj.redirect('/?book_added=true');
  } catch (err) {
    responseObj.redirect('/create/book');
  }
});

module.exports = router;