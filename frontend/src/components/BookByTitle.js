import React, { useState } from 'react';

function BookByTitle() {
  const [title, setTitle] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    const response = await fetch(`/api/books/search?title=${title}`);
    const data = await response.json();
    setBooks(data);
  };

  return (
    <div>
      <h2>Search Books by Title</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter book title"
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {books.map((book) => (
          <li key={book._id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default BookByTitle;
