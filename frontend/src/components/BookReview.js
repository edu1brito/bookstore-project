import React, { useState } from 'react';

function BookReview() {
  const [isbn, setIsbn] = useState('');
  const [reviews, setReviews] = useState([]);

  const handleSearch = () => {
    fetch(`http://localhost:5000/api/reviews?isbn=${isbn}`)
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error(error));
  };

  return (
    <div style={{ padding: '40px', backgroundColor: '#f0f2f5', minHeight: '100vh' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: '#ffffff', padding: '30px', borderRadius: '10px', boxShadow: '0px 0px 10px rgba(0,0,0,0.1)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Search Reviews by ISBN</h2>
        
        <div style={{ display: 'flex', marginBottom: '20px' }}>
          <input
            type="text"
            placeholder="Enter ISBN"
            value={isbn}
            onChange={(e) => setIsbn(e.target.value)}
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '5px 0 0 5px',
              outline: 'none'
            }}
          />
          <button
            onClick={handleSearch}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '0 5px 5px 0',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            Search
          </button>
        </div>

        <ul style={{ listStyle: 'none', padding: '0' }}>
          {reviews.length === 0 ? (
            <li style={{ textAlign: 'center', color: '#777' }}>No reviews found.</li>
          ) : (
            reviews.map((review) => (
              <li
                key={review._id}
                style={{
                  padding: '15px',
                  borderBottom: '1px solid #eee',
                  color: '#555',
                  backgroundColor: '#fafafa',
                  borderRadius: '5px',
                  marginBottom: '10px'
                }}
              >
                <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                  Rating: {review.rating} ⭐
                </div>
                <div style={{ fontSize: '14px', color: '#666' }}>
                  {review.review}
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default BookReview;
