import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import authService from '../../services/authService';

import './VerifyEmail.css';

const VerifyEmailPage = () => {
  const { token } = useParams();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyEmail = async () => {
      setLoading(true);
      setMessage('');
      setError('');
      try {
        const data = await authService.verifyEmail(token);
        if (data) {
          setMessage(data.message || 'Email verified successfully.');
        }
      } catch (error) {
        console.error('Email verification error:', error);
        setError('Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  if (loading) {
    return <div>Verifying email...</div>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div className="verify-email-page">
      <div className="verify-email-container">
        <h2>Verify Email</h2>
        {loading && <p className="loading">Verifying email...</p>}
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;