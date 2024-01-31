const router = require('express').Router();
const path = require('path');

// Show the user form page
router.get('/create/user', (requestObj, responseObj) => {
  responseObj.sendFile(path.join(__dirname, '../public/user_form.html'));
});

// Show the book form page
router.get('/create/book', (requestObj, responseObj) => {
  responseObj.sendFile(path.join(__dirname, '../public/book_form.html'));
});

module.exports = router;