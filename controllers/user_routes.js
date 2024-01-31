const router = require('express').Router();

const User = require('../models/User');
const Book = require('../models/Book');


// localhost:3333/api/users
// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  // Make a query to the db and get all rows from the users table
  try {
    const users = await User.findAll();

    responseObj.json(users);
  } catch (err) {
    console.log(err);
  }

});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
  // Get the old users array
  const userData = requestObj.body;

  try {
    const user = await User.create(userData);

    responseObj.json({
      message: 'User added successfully!',
      user: user
    });
  } catch (err) {
    const messages = err.errors.map(eObj => eObj.message);

    responseObj.json({
      error: 401,
      messages: messages
    });
  }
});

// GET Route to return a user by ID
router.get('/user', async (requestObj, responseObj) => {
  const user_id = requestObj.query.user_id;

  try {

    const user = await User.findOne({
      where: {
        id: user_id
      }
    });

    if (user) {
      return responseObj.json(user);
    }

    responseObj.json({
      error: 404,
      message: 'User not found by that ID'
    });

  } catch (err) {
    console.log(err);
  }

});

// GET Route to get the users and their associated books
router.get('/users/books', async (requestObj, responseObj) => {
  try {
    const users = await User.findAll({
      include: Book
    });

    responseObj.json(users);
  } catch (err) {
    console.log(err);
  }
});


// GET Route to get a single user's books
router.get('/user/books', async (requestObj, responseObj) => {
  const user_id = requestObj.query.user_id;

  try {
    const user = await User.findOne({
      where: {
        id: user_id
      },
      include: Book
    });

    responseObj.json(user);
  } catch (err) {
    console.log('error', err);
  }
});

// DELETE Route to remove a user from the database
router.delete('/user/:id', async (requestObj, responseObj) => {
  const user_id = requestObj.params.id;

  try {
    // Run a query to delete a user row from the table by user_id
    await User.destroy({
      where: {
        id: user_id
      }
    });

    responseObj.send({
      message: 'User deleted successfully!'
    });

  } catch (err) {
    console.log(err);
  }

});

module.exports = router;
