import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../components/pages/HomePage';
import LoginPage from '../components/auth/LoginPage';
import RegisterPage from '../components/auth/RegisterPage';
import ForgotPasswordPage from '../components/auth/ForgotPasswordPage';
import ResetPasswordPage from '../components/auth/ResetPasswordPage';
import ProfilePage from '../components/pages/ProfilePage';
import UsersListPage from '../components/pages/UsersListPage';
import VerifyEmailPage from '../components/pages/VerifyEmailPage';
import PrivateRoute from './PrivateRoute';
import MainLayout from '../layout/MainLayout';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
        <Route path="verify-email/:token" element={<VerifyEmailPage />} />
              
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="users" element={<UsersListPage />} />
          </Route>
        </Route>

      </Routes>
    </Router>
  );
};

export default AppRouter;