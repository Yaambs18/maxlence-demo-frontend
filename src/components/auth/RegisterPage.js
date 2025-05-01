import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../UI/Button';
import authService from '../../services/authService';

import './RegisterPage.css';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
    

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError('');
    setSuccessMessage('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('password', password);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {

      const data = await authService.register(formData);

      if (data) {
        setSuccessMessage(data.message || 'Registration successful. Please check your email.');
        setTimeout(() => navigate('/login'), 3000);
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='register-page'>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
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
        <div>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="profileImage">Profile Image (Optional):</label>
          <input
            type="file"
            id="profileImage"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <Button className='button' type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </Button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;