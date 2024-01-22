const router = require('express').Router();
const { v4 } = require('uuid');

const { getUserData, saveUserData } = require('../db');

// localhost:3333/api/users
// Route to retreive/GET all users from the json database
router.get('/users', async (requestObj, responseObj) => {
  // Read the json file data
  const users = await getUserData();

  responseObj.send(users);
});

// Route to add a user to the json database
router.post('/users', async (requestObj, responseObj) => {
  // Get the old users array
  const users = await getUserData();
  const userData = requestObj.body;

  // Overwrite the old array with the newly updated array
  if (!users.find(user => user.username === userData.username) && userData.username) {
    // Push the body object from the client to our old array

    userData.id = v4();

    users.push(userData);

    await saveUserData(users);

    return responseObj.send({
      message: 'User added successfully!'
    });
  }

  responseObj.send({
    error: 402,
    message: 'User already exists'
  });

});

// GET Route to return a user by ID
router.get('/users/:id', async (requestObj, responseObj) => {
  const user_id = requestObj.params.id;

  const users = await getUserData();

  const user = users.find(user => user.id === user_id);

  if (user) {
    return responseObj.send(user);
  }

  responseObj.send({
    error: 404,
    message: 'User not found with that'
  })
});

// DELETE Route to remove a user from the database
router.delete('/user/:id', async (requestObj, responseObj) => {
  // Get the user data
  const users = await getUserData();
  const user_id = requestObj.params.id;

  // Filter out the user object matching our param id from the users array
  const filtered = users.filter(usrObj => usrObj.id !== user_id);

  await saveUserData(filtered);

  responseObj.send({
    message: 'User deleted successfully!'
  });
});

module.exports = router;