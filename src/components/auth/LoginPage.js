import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import { useAuth } from '../../contexts/AuthContext';

import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {

      const data = await login(email, password);;

      if (data) {
        console.log('Login successful:', data);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2>Login</h2>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <Button className='button' type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>
        <div className="forgot-password">
          <Link to="/forgot-password">Forgot your password?</Link>
        </div>
        <div className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;