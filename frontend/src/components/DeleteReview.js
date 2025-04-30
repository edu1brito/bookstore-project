import React, { useState } from 'react';

function DeleteReview() {
  const [reviewId, setReviewId] = useState('');

  const handleDelete = () => {
    if (!reviewId.trim()) {
      alert('Please enter a Review ID.');
      return;
    }

    fetch(`http://localhost:5000/api/reviews/${reviewId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        console.log('Review deleted:', data);
        alert('Review deleted successfully!');
        setReviewId('');
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error deleting review.');
      });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '60px auto', padding: '30px', backgroundColor: '#ffffff', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '25px', color: '#2c3e50' }}>🗑️ Delete Review</h2>
      
      <input
        type="text"
        placeholder="Enter user ID"
        value={reviewId}
        onChange={(e) => setReviewId(e.target.value)}
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
        onClick={handleDelete}
        style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#e74c3c',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '16px',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#c0392b'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#e74c3c'}
      >
        Delete Review
      </button>
    </div>
  );
}

export default DeleteReview;
