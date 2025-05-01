const API_BASE_URL = 'http://localhost:3000/users';

const userService = {
  async getProfile() {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get profile error:', error);
      throw error;
    }
  },

  async getUsers(page = 1, pageSize = 10) {
    const token = localStorage.getItem('accessToken');
    try {
      const response = await fetch(`${API_BASE_URL}?page=${page}&pageSize=${pageSize}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error('Get users error:', error);
      throw error;
    }
  },
};

export default userService;