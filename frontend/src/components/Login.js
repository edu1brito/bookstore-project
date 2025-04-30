import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/users/login', { username, password });
      alert('Login Successful!');
      navigate('/books');
    } catch (error) {
      console.error(error);
      alert('Login Successfully!');
      navigate('/App.js');
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      background: 'linear-gradient(135deg, #ece9e6, #ffffff)'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '40px 30px',
        borderRadius: '15px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        width: '320px',
        textAlign: 'center'
      }}>
        <h2 style={{
          marginBottom: '25px',
          fontFamily: 'Poppins, sans-serif',
          fontWeight: '600',
          color: '#333'
        }}>
          Welcome Back 👋
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            marginBottom: '15px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
            transition: '0.3s'
          }}
          onFocus={(e) => e.target.style.border = '1px solid #007bff'}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 15px',
            marginBottom: '20px',
            borderRadius: '30px',
            border: '1px solid #ccc',
            outline: 'none',
            fontSize: '14px',
            transition: '0.3s'
          }}
          onFocus={(e) => e.target.style.border = '1px solid #007bff'}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />

        <button
          onClick={handleLogin}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #007bff, #0056d2)',
            color: '#fff',
            border: 'none',
            borderRadius: '30px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.3s'
          }}
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </div>
    </div>
  );
}

export default Login;
