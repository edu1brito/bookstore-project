const Book = require('../models/Book');

// Search books by title or author
exports.searchBooks = async (req, res) => {
  const { title, author } = req.query;

  try {
    const query = {};
    if (title) query.title = { $regex: new RegExp(title, 'i') }; // Case-insensitive search
    if (author) query.author = { $regex: new RegExp(author, 'i') };

    const books = await Book.find(query);

    if (books.length === 0) {
      return res.status(404).json({ message: 'No books found matching the search criteria.' });
    }

    res.status(200).json({ books });
  } catch (err) {
    res.status(500).json({ error: 'Error searching books', message: err.message });
  }
};

// Get all books
exports.getBooks = (req, res) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(err => res.status(400).json({ error: 'Error fetching books', message: err.message }));
};

// Get a single book by ID
exports.getBookById = (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json(book);
    })
    .catch(err => res.status(400).json({ error: 'Error fetching book', message: err.message }));
};

// Add a new book
exports.addBook = (req, res) => {
  const { title, author, isbn, price } = req.body;

  // Validate required fields
  if (!title || !author || !isbn || !price) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const newBook = new Book({ title, author, isbn, price });

  newBook.save()
    .then(() => res.status(201).json({ message: 'Book added successfully!' }))
    .catch(err => res.status(400).json({ error: 'Error adding book', message: err.message }));
};

// Update a book
exports.updateBook = (req, res) => {
  Book.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(updatedBook => {
      if (!updatedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book updated successfully!', book: updatedBook });
    })
    .catch(err => res.status(400).json({ error: 'Error updating book', message: err.message }));
};

// Delete a book
exports.deleteBook = (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(deletedBook => {
      if (!deletedBook) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.status(200).json({ message: 'Book deleted successfully!' });
    })
    .catch(err => res.status(400).json({ error: 'Error deleting book', message: err.message }));
};
