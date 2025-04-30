import React, { useState } from 'react';

function AddOrModifyReview() {
  const [isbn, setIsbn] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(1);

  const handleSubmit = () => {
    if (!isbn.trim() || !review.trim()) {
      alert('Please fill in all fields.');
      return;
    }

    const reviewData = { isbn, review, rating };
    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(response => response.json())
      .then(data => {
        console.log('Review added/modified:', data);
        alert('Review successfully added/modified!');
        setIsbn('');
        setReview('');
        setRating(1);
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error submitting review.');
      });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '60px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>✍️ Add or Modify Review</h2>

      <input
        type="text"
        placeholder="Enter ISBN"
        value={isbn}
        onChange={(e) => setIsbn(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />

      <textarea
        placeholder="Enter review"
        value={review}
        onChange={(e) => setReview(e.target.value)}
        rows="4"
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
          resize: 'vertical',
        }}
      />

      <input
        type="number"
        value={rating}
        min="1"
        max="5"
        onChange={(e) => setRating(e.target.value)}
        style={{
          width: '100%',
          padding: '12px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#27ae60',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#219150'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#27ae60'}
      >
        Submit Review
      </button>
    </div>
  );
}

export default AddOrModifyReview;
