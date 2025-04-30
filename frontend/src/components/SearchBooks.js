import React, { useState } from 'react';

function SearchBooks() {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('title');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/search?${searchType}=${query}`);
      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Error occurred');
        setResult(' Found');
        return;
      }
      const data = await response.json();
      setResult(data.books.length > 0 ? 'Found' : ' Found');
      setError('');
    } catch (err) {
      setError('An error occurred while searching.');
      setResult(' Found');
    }
  };

  return (
    <div>
      <h2>Search Books</h2>
      <select value={searchType} onChange={(e) => setSearchType(e.target.value)}>
        <option value="title">Title</option>
        <option value="author">Author</option>
      </select>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={`Enter ${searchType}`}
      />
      <button onClick={handleSearch}>Search</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {result && <p>{result}</p>}
    </div>
  );
}

export default SearchBooks;