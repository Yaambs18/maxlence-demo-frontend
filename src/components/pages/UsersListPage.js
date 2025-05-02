import React, { useState, useEffect, useCallback, useRef } from 'react';
import userService from '../../services/userService';
import Button from '../UI/Button';

import './UsersList.css';

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5);
  const searchNameRef = useRef('');
  const searchEmailRef = useRef('');
  const filterRoleRef = useRef('');

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await userService.getUsers(
        page, pageSize, searchNameRef?.current?.value, searchEmailRef?.current?.value, filterRoleRef?.current?.value
      );
      if (data) {
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } else {
        setError(data.message || 'Failed to fetch users.');
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to connect to the server.');
    } finally {
      setLoading(false);
    }
  }, [page, pageSize]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  const handleSearch = () => {
    setPage(1); // Reset to the first page on new search
    fetchUsers();
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setLoading(true);
      setError('');
      try {
        const response = await userService.deleteUser(userId);
        if (response && response.message) {
          fetchUsers();
        } else if (response && response.error) {
          setError(response.error);
        } else {
          setError('Failed to delete user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        setError('Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) {
    return <div className="users-list-page"><div className="loading">Loading users...</div></div>;
  }

  if (error) {
    return <div className="users-list-page"><p className="error">{error}</p></div>;
  }

  return (
    <div className="users-list-page">
      <h2>User List</h2>

      <div className="filters-container">
        <div className="search-input">
          <label htmlFor="name">Search by Name:</label>
          <input
            type="text"
            id="searchName"
            ref={searchNameRef}
          />
        </div>
        <div className="search-input">
          <label htmlFor="email">Search by Email:</label>
          <input
            type="text"
            id="searchEmail"
            ref={searchEmailRef}
          />
        </div>
        <div className="filter-role">
          <label htmlFor="filterRole">Filter by Role:</label>
          <select
            id="filterRole"
            ref={filterRoleRef}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
        <Button className="button" onClick={handleSearch}>
          Search
        </Button>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Profile Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.email}</td>
              <td>{user.name}</td>
              <td>{user.role}</td>
              <td>
                {user.profileImage && (
                  <img
                    src={`http://localhost:3000/uploads/${user.profileImage.split('/').pop()}`}
                    alt={user.name || 'Profile'}
                    className="profile-image"
                  />
                )}
              </td>
              <td>
                <Button
                  className="delete-button"
                  onClick={() => handleDeleteUser(user.id)}
                  disabled={loading}
                >
                  {loading ? 'Deleting...' : 'Delete'}
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination-container">
        <button onClick={handlePreviousPage} disabled={page === 1}>
          Previous
        </button>
        {getPageNumbers().map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => handlePageClick(pageNumber)}
            className={page === pageNumber ? 'active' : ''}
          >
            {pageNumber}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={page === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UsersListPage;