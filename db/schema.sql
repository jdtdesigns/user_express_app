DROP DATABASE IF EXISTS mysql_first_day_db;

CREATE DATABASE mysql_first_day_db;

USE mysql_first_day_db;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(250) NOT NULL,
  email VARCHAR(250) NOT NULL,
  password VARCHAR(250) NOT NULL
);

CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(250) NOT NULL,
  author VARCHAR(250) NOT NULL,
  release_date VARCHAR(250) NOT NULL,
  user_id INT NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

INSERT INTO users (username, email, password) VALUES
  ('JD', 'jd@test.com', 'password123'),
  ('Bob', 'bob@test.com', 'password123'),
  ('Jane', 'jane@test.com', 'password123');


INSERT INTO books (title, author, release_date, user_id) VALUES
  ('Jurassic Park', 'Michael Crichton', '1/1/89', 1),
  ('Dracula', 'Bram Stoker', '1/1/65', 1),
  ('I have a Dream', 'Martin Luther King Jr', '1/1/63', 3);

SELECT 
  users.id AS user_id,
  username,
  email,
  books.id AS book_id,
  title,
  author,
  release_date
  FROM users
  JOIN books ON books.user_id = users.id;


-- SELECT * FROM users;