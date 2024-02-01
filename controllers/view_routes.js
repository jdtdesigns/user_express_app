const router = require('express').Router();
const { fn, col } = require('sequelize');

const User = require('../models/User');
const Book = require('../models/Book');

function protect(req, res, next) {
  if (req.session.user_id) {
    return next();
  }

  res.redirect('/login');
}

// Show the homepage
router.get('/', async (req, res) => {
  const user = await User.findByPk(req.session.user_id);

  res.render('home', {
    title: 'User App API Documentation',
    user: user ? user.get({ plain: true }) : null
  });
});

// Show the register form page
router.get('/create/user', (req, res) => {
  res.render('forms/register_form', {
    title: 'Register',
    errors: req.session.errors
  });

  delete req.session.errors;
});

// Show the login form page
router.get('/login', (req, res) => {
  res.render('forms/login_form', {
    title: 'Log In',
    errors: req.session.errors
  });

  delete req.session.errors;
});

// Show the book form page
router.get('/create/book', (req, res) => {
  res.render('forms/book_form', {
    title: 'Book Form'
  });
});

// Show the data page
router.get('/data', protect, async (req, res) => {
  const user = await User.findByPk(req.session.user_id, {
    include: {
      model: Book,
      attributes: [
        'id',
        'title',
        'author',
        [fn('date_format', col('release_date'), '%m/%d/%Y'), 'formatted_date']
      ]
    }
  });

  res.render('data', {
    user: user.get({ plain: true }),
  });
});

// Log Out User
router.get('/logout', (req, res) => {
  req.session.destroy();

  res.redirect('/');
});

module.exports = router;