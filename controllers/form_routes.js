const router = require('express').Router();
const User = require('../models/User');
const Book = require('../models/Book');

// POST - Create a User Route
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);

    req.session.user_id = user.id;

    res.redirect('/');
  } catch (err) {
    const messages = err.errors.map(eObj => eObj.message);

    req.session.errors = messages;

    console.log(err);

    res.redirect('/create/user');
  }
});

// POST - Log In User Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({
      where: {
        email: email
      }
    });

    // User is not found
    if (!user) {
      req.session.errors = ['A user with that email address does not exist'];

      return res.redirect('/register');
    }

    // Validate their password
    const valid_pass = await user.validatePass(password);

    if (!valid_pass) {
      req.session.errors = ['Password is invalid'];
      return res.redirect('/login');
    }

    req.session.user_id = user.id;

    res.redirect('/');
  } catch (err) {
    const messages = err.errors.map(eObj => eObj.message);

    req.session.errors = messages;

    res.redirect('/login');
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