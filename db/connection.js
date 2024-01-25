const mysql = require('mysql2');
require('dotenv').config();

// Create connection to our mysql database
const connection = mysql.createConnection({
  host: process.env.DB_HOST_URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE_NAME
});

module.exports = connection.promise();