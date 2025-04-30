//import React, { useState } from 'react';

// filepath: d:\bookstore-project\bookstore-project\backend\routes\bookRoutes.js
const express = require('express');
const { getBooks, getBookById, addBook, updateBook, deleteBook, searchBooks } = require('../controllers/bookController');
const router = express.Router();

// Get all books
router.get('/', getBooks);

// Get a single book by ID
router.get('/:id', getBookById);

// Add a new book
router.post('/', addBook);

// Update a book
router.put('/:id', updateBook);

// Delete a book
router.delete('/:id', deleteBook);

// Search books by title, author, or ISBN
router.get('/search', searchBooks);

module.exports = router;