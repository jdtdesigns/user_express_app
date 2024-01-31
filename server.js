const express = require('express');

const PORT = 3333;

const app = express();

const user_routes = require('./routes/user_routes');
const book_routes = require('./routes/book_routes');
const view_routes = require('./routes/view_routes');
const form_routes = require('./routes/form_routes');

// Import the sequelize connection
const db = require('./db/connection');

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());
// Open a channel to allow url encoded data through
app.use(express.urlencoded({ extended: false }));

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'));

// Load Routes
app.use('/api', [user_routes, book_routes]);
app.use('/', [view_routes, form_routes]);

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  });