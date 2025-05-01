import React, { useState } from 'react';
import Button from '../UI/Button';
import authService from '../../services/authService';

import './ForgotPasswordPage.css';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {

      const data = await authService.forgotPassword(email);
      setMessage(data.message || 'Password reset link sent to your email.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-container">
        <h2>Forgot Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
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
          <Button className='button' type="submit" disabled={loading}>
            {loading ? 'Sending link...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;