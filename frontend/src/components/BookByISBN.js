import React, { useState } from 'react';

function BookByISBN() {
  const [isbn, setIsbn] = useState('');
  const [book, setBook] = useState(null);

  const handleSearch = () => {
    fetch(`http://localhost:5000/api/books/${isbn}`)
      .then(response => response.json())
      .then(data => setBook(data))
      .catch(error => console.error(error));
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Search Book by ISBN</h2>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Enter ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            style={styles.input}
          />
          <button onClick={handleSearch} style={styles.button}>
            Search
          </button>
        </div>

        {book ? (
          <div style={styles.bookInfo}>
            <h3 style={styles.bookTitle}>{book.title}</h3>
            <p style={styles.bookDetails}>Author: {book.author}</p>
            <p style={styles.bookDetails}>ISBN: {book.isbn}</p>
          </div>
        ) : (
          isbn && (
            <div style={styles.noBookMessage}>
              No book found with this ISBN.
            </div>
          )
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f7f8fa',
    minHeight: '100vh',
  },
  card: {
    maxWidth: '600px',
    margin: '0 auto',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
    fontWeight: '500',
  },
  searchContainer: {
    display: 'flex',
    marginBottom: '20px',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px 0 0 5px',
    outline: 'none',
  },
  button: {
    padding: '12px 20px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '0 5px 5px 0',
    cursor: 'pointer',
    fontSize: '16px',
  },
  bookInfo: {
    padding: '20px',
    backgroundColor: '#f8f9fa',
    borderRadius: '8px',
    marginTop: '20px',
    textAlign: 'left',
  },
  bookTitle: {
    fontSize: '20px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  bookDetails: {
    fontSize: '16px',
    color: '#555',
    marginBottom: '8px',
  },
  noBookMessage: {
    fontSize: '16px',
    color: '#888',
    marginTop: '20px',
  },
};

export default BookByISBN;
