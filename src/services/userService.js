const API_BASE_URL = "http://localhost:3000/users";

const userService = {
  async getProfile() {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Get profile error:", error);
      throw error;
    }
  },

  async getUsers(page = 1, pageSize = 10, name = "", email = "", role = "") {
    const token = localStorage.getItem("accessToken");
    try {
      let url = `${API_BASE_URL}?page=${page}&pageSize=${pageSize}`;
      if (name) {
        url += `&name=${encodeURIComponent(name)}`;
      }
      if (email) {
        url += `&email=${encodeURIComponent(email)}`;
      }
      if (role) {
        url += `&role=${encodeURIComponent(role)}`;
      }
      const response = await fetch(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return await response.json();
    } catch (error) {
      console.error("Get users error:", error);
      throw error;
    }
  },

  async updateProfile(formData) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_BASE_URL}/me`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return await response.json();
    } catch (error) {
      console.error("Update profile error:", error);
      throw error;
    }
  },
  async deleteUser(userId) {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(`${API_BASE_URL}/${userId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      });
      return await response.json();
    } catch (error) {
      console.error("Delete user error:", error);
      throw error;
    }
    }
};

export default userService;
