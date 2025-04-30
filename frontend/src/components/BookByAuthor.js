import React, { useState } from 'react';

function BookByAuthor() {
  const [author, setAuthor] = useState('');
  const [books, setBooks] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books?author=${author}`);
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '50px 20px',
      background: 'linear-gradient(to right, #f0f2f5, #ffffff)',
      minHeight: '100vh',
      fontFamily: 'Poppins, sans-serif'
    }}>
      <h2 style={{
        marginBottom: '30px',
        fontSize: '32px',
        color: '#333'
      }}>
        🔎 Search Books by Author
      </h2>

      <div style={{
        display: 'flex',
        marginBottom: '30px',
        gap: '10px'
      }}>
        <input
          type="text"
          placeholder="Enter author name"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          style={{
            padding: '12px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            width: '250px',
            fontSize: '16px'
          }}
        />
        <button
          onClick={handleSearch}
          style={{
            padding: '12px 20px',
            borderRadius: '5px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Search
        </button>
      </div>

      <ul style={{
        listStyleType: 'none',
        padding: 0,
        width: '60%'
      }}>
        {books.length === 0 ? (
          <p style={{ color: '#555', fontSize: '18px' }}>No books found.</p>
        ) : (
          books.map((book) => (
            <li key={book._id} style={{
              backgroundColor: '#fff',
              padding: '15px',
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              fontSize: '18px'
            }}>
              📖 {book.title} <br />
              <span style={{ color: '#555', fontSize: '16px' }}>by {book.author}</span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default BookByAuthor;
