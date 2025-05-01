import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/UI/Button';

import './HeaderLayout.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="app-header">
      <Link to="/" className="logo">
        Maxlence Demo App Name
      </Link>
      <nav>
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link to="/profile">Profile</Link>
            {user?.role === 'admin' && <Link to="/users">Users List</Link>}
            <Button className='button' onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;