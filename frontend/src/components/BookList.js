import React, { useEffect, useState } from 'react';


const BookList = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    console.log('Fetching all books');

    // Mock data
    setBooks([
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee' },
      { title: '1984', author: 'George Orwell' }
    ]);

    // Future API Call Example:
    // axios.get('http://localhost:5000/api/books')
    //   .then(response => setBooks(response.data))
    //   .catch(error => console.error('Error fetching books:', error));
  }, []);

  return (
    <div style={{
      padding: '50px 20px',
      background: 'linear-gradient(to right, #f0f2f5, #ffffff)',
      minHeight: '100vh'
    }}>
      <h2 style={{
        textAlign: 'center',
        marginBottom: '40px',
        fontSize: '32px',
        color: '#333',
        fontFamily: 'Poppins, sans-serif'
      }}>
        📚 Book Collection
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center'
      }}>
        <table style={{
          width: '85%',
          backgroundColor: '#fff',
          borderRadius: '10px',
          overflow: 'hidden',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          fontFamily: 'Poppins, sans-serif'
        }}>
          <thead>
            <tr style={{
              backgroundColor: '#007bff',
              color: '#ffffff',
              textAlign: 'center'
            }}>
              <th style={{ padding: '15px', fontSize: '18px' }}>Title</th>
              <th style={{ padding: '15px', fontSize: '18px' }}>Author</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book, index) => (
              <tr
                key={index}
                style={{
                  textAlign: 'center',
                  backgroundColor: index % 2 === 0 ? '#f9f9f9' : '#ffffff'
                }}
              >
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  fontSize: '16px'
                }}>
                  {book.title}
                </td>
                <td style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  fontSize: '16px'
                }}>
                  {book.author}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookList;
