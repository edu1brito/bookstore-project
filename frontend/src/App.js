import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import BookList from './components/BookList';
import BookByTitle from './components/BookByTitle';
import BookByAuthor from './components/BookByAuthor';
import BookByISBN from './components/BookByISBN';
import BookReview from './components/BookReview';
import AddOrModifyReview from './components/AddOrModifyReview';
import DeleteReview from './components/DeleteReview';

function App() {
  const [theme, setTheme] = React.useState('light');

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const sidebarStyle = {
    width: '250px',
    background: theme === 'light' ? '#2c3e50' : '#1e272e',
    padding: '30px 20px',
    color: '#ecf0f1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100vh',
  };

  const linkContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  };

  return (
    <div style={{ backgroundColor: theme === 'light' ? '#dfe6e9' : '#2f3640', minHeight: '100vh' }}>
      <Router>
        <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
          
          {/* Sidebar */}
          <div style={sidebarStyle}>
            <div>
              <h2 style={{ marginBottom: '30px', fontSize: '24px' }}>📚 Bookstore</h2>
              <nav style={linkContainerStyle}>
                <CustomLink to="/books">View All Books</CustomLink>
                <CustomLink to="/books/title">Search by Title</CustomLink>
                <CustomLink to="/books/author">Search by Author</CustomLink>
                <CustomLink to="/books/isbn">Search by ISBN</CustomLink>
                <CustomLink to="/reviews/search">Search by Review</CustomLink>
                <CustomLink to="/reviews/add/1234567890">Add/Modify Review</CustomLink> 
                <CustomLink to="/reviews/delete/1234567890">Delete Review</CustomLink>
              </nav>
            </div>

            {/* Bottom section */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              
              {/* Theme Selection Dropdown */}
              <select 
                value={theme} 
                onChange={handleThemeChange} 
                style={{
                  padding: '10px',
                  borderRadius: '5px',
                  border: 'none',
                  fontSize: '16px',
                  backgroundColor: '#34495e',
                  color: '#ecf0f1',
                  cursor: 'pointer'
                }}
              >
                <option value="light">🌞 Light Theme</option>
                <option value="dark">🌑 Dark Theme</option>
              </select>

              {/* Logout */}
              <CustomLink to="/">Logout</CustomLink>
            </div>
          </div>

          {/* Main Content */}
          <div style={{ flex: 1, padding: '40px', background: theme === 'light' ? '#f5f6fa' : '#353b48' }}>
            {/* Top-right login/register */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px', gap: '15px' }}>
              <CustomButton to="/">Login</CustomButton>
              <CustomButton to="/register">Register</CustomButton>
            </div>

            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/books" element={<BookList />} />
              <Route path="/books/title" element={<BookByTitle />} />
              <Route path="/books/author" element={<BookByAuthor />} />
              <Route path="/books/isbn" element={<BookByISBN />} />
              <Route path="/reviews/:isbn" element={<BookReview />} />
              <Route path="/reviews/add/:isbn" element={<AddOrModifyReview />} />
              <Route path="/reviews/delete/:isbn" element={<DeleteReview />} />
              <Route path="/reviews/search" element={<BookReview />} />
            </Routes>
          </div>

        </div>
      </Router>
    </div>
  );
}

// Sidebar link with hover
function CustomLink({ to, children }) {
  const linkStyle = {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '18px',
    padding: '10px',
    borderRadius: '5px',
    transition: 'background 0.3s',
  };

  const hoverStyle = {
    backgroundColor: '#34495e',
  };

  const [hover, setHover] = React.useState(false);

  return (
    <Link
      to={to}
      style={hover ? { ...linkStyle, ...hoverStyle } : linkStyle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {children}
    </Link>
  );
}

// Top-right Button
function CustomButton({ to, children }) {
  return (
    <Link
      to={to}
      style={{
        backgroundColor: '#0984e3',
        color: 'white',
        padding: '10px 20px',
        textDecoration: 'none',
        borderRadius: '5px',
        fontWeight: 'bold',
      }}
    >
      {children}
    </Link>
  );
}

export default App;
