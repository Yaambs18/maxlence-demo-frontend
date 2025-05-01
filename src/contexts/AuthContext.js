import React, { createContext, useState, useEffect, useContext } from 'react';
import authService from '../services/authService';
import userService from '../services/userService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('accessToken'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      setLoading(true);
      if (token) {
        try {
          const profile = await userService.getProfile();
          setUser(profile);
          setIsAuthenticated(true);
        } catch (error) {
          localStorage.removeItem('accessToken');
          setToken(null);
          setIsAuthenticated(false);
          setUser(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await authService.login(email, password);
      localStorage.setItem('accessToken', data.accessToken);
      setToken(data.accessToken);
      setIsAuthenticated(true);
      const profile = await userService.getProfile();
      setUser(profile);
      return true;
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('accessToken');
    setToken(null);
    setIsAuthenticated(false);
    setUser(null);
  };

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};