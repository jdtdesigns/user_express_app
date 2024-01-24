const router = require('express').Router();

const db = require('../db/connection');

// localhost:3333/api/users
// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  // Make a query to the db and get all rows from the users table
  try {
    const [users] = await db.query('SELECT * FROM users');

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
    // Check if the user already exists
    const [results] = await db.query('SELECT * FROM users WHERE username = ?', [userData.username]);

    // Check if a user was found matching that username
    if (results.length) {
      return responseObj.json({
        error: 402,
        message: 'That user already exists'
      });
    }

    // Run a query to INSERT a new user into the users table, with our requestObj.body data (username, email, password)
    const [data] = await db.query(
      'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
      [userData.username, userData.email, userData.password]);

    responseObj.json({
      message: 'User added successfully!',
      insertId: data.insertId
    });
  } catch (err) {
    console.log(err);
  }

});

// GET Route to return a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
  const user_id = requestObj.params.id;

  try {

    const [results] = await db.query('SELECT * FROM users WHERE id = ?', [user_id]);

    if (results.length) {
      return responseObj.json(results[0]);
    }

    responseObj.json({
      error: 404,
      message: 'User not found with that ID'
    });

  } catch (err) {
    console.log(err);
  }

});

// DELETE Route to remove a user from the database
router.delete('/user/:id', async (requestObj, responseObj) => {
  const user_id = requestObj.params.id;

  try {
    // Run a query to delete a user row from the table by user_id
    await db.query('DELETE FROM users WHERE id = ?', [user_id]);

    responseObj.send({
      message: 'User deleted successfully!'
    });

  } catch (err) {
    console.log(err);
  }

});

module.exports = router;