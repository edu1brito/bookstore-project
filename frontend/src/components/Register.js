import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');        // Added email state
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post('http://localhost:5000/api/auth/register', { username, email, password });   // include email also
      alert('Registration Successful!');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Registration Failed: ' + (error.response?.data?.message || 'Server Error'));
    }
    setLoading(false);
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '90vh',
      background: 'linear-gradient(135deg, #e0f7fa, #ffffff)'
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
          Create Account 🚀
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
          onFocus={(e) => e.target.style.border = '1px solid #28a745'}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          onFocus={(e) => e.target.style.border = '1px solid #28a745'}
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
          onFocus={(e) => e.target.style.border = '1px solid #28a745'}
          onBlur={(e) => e.target.style.border = '1px solid #ccc'}
        />

        <button
          onClick={handleRegister}
          style={{
            width: '100%',
            padding: '12px',
            background: 'linear-gradient(to right, #28a745, #218838)',
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
          {loading ? 'Registering...' : 'Register'}
        </button>
      </div>
    </div>
  );
}

export default Register;
