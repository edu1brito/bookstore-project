import React, { useState } from 'react';

function SearchDialog({ searchType, onClose }) {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`/api/books/search?${searchType}=${query}`);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message);
        setResult(null);
        return;
      }
      const data = await response.json();
      setResult(data.books.length > 0 ? 'Book found!' : 'Book not found.');
      setError('');
    } catch (err) {
      setError('An error occurred while searching.');
      setResult(null);
    }
  };

  return (
    <div className="dialog">
      <h3>Search by {searchType}</h3>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Enter ${searchType}`}
      />
      <button onClick={handleSearch}>Search</button>
      <button onClick={onClose}>Close</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default SearchDialog;