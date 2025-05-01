const API_BASE_URL = 'http://localhost:3000/auth';

const authService = {
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return await response.json();
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/register`, {
        method: 'POST',
        body: userData,
      });
      if (!response.ok) {
        throw new Error('Failed to register');
      }
      return await response.json();
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  },

  async forgotPassword(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new Error('Failed to send reset password email');
      }
      return await response.json();
    } catch (error) {
      console.error('Forgot password error:', error);
      throw error;
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(`${API_BASE_URL}/reset-password/${token}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ newPassword }),
      });
      if (response.status === 200) {
        return await response.json();
      } else {
        throw new Error('Failed to reset password');
      }
    } catch (error) {
      console.error('Reset password error:', error);
      throw error;
    }
  },

  async verifyEmail(token) {
    try {
      const response = await fetch(`${API_BASE_URL}/verify-email/${token}`);
      if (!response.ok) {
        throw new Error('Failed to verify email');
      }
      return await response.json();
    } catch (error) {
      console.error('Verify email error:', error);
      throw error;
    }
  },
};

export default authService;