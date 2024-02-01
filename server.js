const express = require('express');
const { engine } = require('express-handlebars');
const session = require('express-session');

require('dotenv').config();
const PORT = 3333;

const app = express();

const user_routes = require('./controllers/user_routes');
const book_routes = require('./controllers/book_routes');
const view_routes = require('./controllers/view_routes');
const form_routes = require('./controllers/form_routes');

// Import the sequelize connection
const db = require('./db/connection');

// Opening up the middleware channel to allow json to be sent through from the client
app.use(express.json());
// Open a channel to allow url encoded data through
app.use(express.urlencoded({ extended: false }));

// Share or create a GET route for every file in the public folder
app.use(express.static('./public'));

// Set up Handlebars
app.engine('hbs', engine({ extname: '.hbs' }));
app.set('view engine', 'hbs');
app.set('views', './views');

// Initialize Sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  // cookie: { maxAge: 60 * 60 * 1000 }
}))

// Load Routes
app.use('/api', [user_routes, book_routes]);
app.use('/', [view_routes, form_routes]);

db.sync({ force: false })
  .then(() => {
    app.listen(PORT, () => {
      console.log('Server started on port', PORT);
    });
  });