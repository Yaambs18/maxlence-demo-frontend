import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import authService from '../../services/authService';

import './ResetPasswordPage.css';

const ResetPasswordPage = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    setLoading(true);
    setMessage('');
    setError('');

    try {

      const data = await authService.resetPassword(token, newPassword);

      if (data) {
        setMessage(data.message || 'Password reset successful. You can now log in.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      console.error('Reset password error:', error);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password-page">
      <div className="reset-password-container">
        <h2>Reset Password</h2>
        {error && <p className="error">{error}</p>}
        {message && <p className="message">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="newPassword">New Password:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="confirmNewPassword">Confirm New Password:</label>
            <input
              type="password"
              id="confirmNewPassword"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          <Button className="button" type="submit" disabled={loading}>
            {loading ? 'Resetting...' : 'Reset Password'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;