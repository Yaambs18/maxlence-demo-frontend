import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';

import './UsersList.css';

const UsersListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRole, setFilterRole] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await userService.getUsers(page, pageSize, searchQuery, filterRole);
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
    };

    fetchUsers();
  }, [page, pageSize, searchQuery, filterRole]);

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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setPage(1);
  };

  const handleFilterChange = (event) => {
    setFilterRole(event.target.value);
    setPage(1);
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
          <label htmlFor="search">Search by Name/Email:</label>
          <input
            type="text"
            id="search"
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <div className="filter-role">
          <label htmlFor="filterRole">Filter by Role:</label>
          <select
            id="filterRole"
            value={filterRole}
            onChange={handleFilterChange}
          >
            <option value="">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>Name</th>
            <th>Role</th>
            <th>Profile Image</th>
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
                    src={`http:localhost:3000/uploads/${user.profileImage.split('/').pop()}`}
                    alt={user.name || 'Profile'}
                    className="profile-image"
                  />
                )}
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