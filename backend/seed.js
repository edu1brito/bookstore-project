// seeds.js
const mongoose = require('mongoose');
const Book = require('./models/Book');
const User = require('./models/User');
const booksData = require('./data/books.json');
const usersData = require('./data/users.json');

// MongoDB connection
mongoose.connect('mongodb://localhost/bookstore', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    return Book.insertMany(booksData);
  })
  .then(() => {
    return User.insertMany(usersData);
  })
  .then(() => {
    console.log('Data inserted successfully!');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.log('Error:', err);
  });
