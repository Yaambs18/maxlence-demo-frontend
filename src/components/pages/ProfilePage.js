import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import Button from '../UI/Button';
import './ProfilePage.css'; // Import the CSS

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [imageUploadError, setImageUploadError] = useState('');

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await userService.getProfile();
        if (data) {
          setUser(data);
          setName(data.name || '');
          setEmail(data.email || '');
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to connect to the server.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setName(user?.name || '');
    setEmail(user?.email || '');
    setProfileImage(null);
    setImageUploadError('');
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleImageChange = (event) => {
    setProfileImage(event.target.files[0]);
  };

  const handleSaveClick = async () => {
    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    if (profileImage) {
      formData.append('profileImage', profileImage);
    }

    try {
      const response = await userService.updateProfile(formData);
      const updatedUser = response.user;
      if (updatedUser) {
        setUser(updatedUser);
        setIsEditing(false);
        setProfileImage(null);
        setImageUploadError('');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p className="loading">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <p className="error">{error}</p>
          <Button onClick={() => window.location.reload()}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>User Profile</h2>
        {isEditing ? (
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" value={name} onChange={handleNameChange} />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" value={email} onChange={handleEmailChange} />
            </div>
            <div>
              <label htmlFor="profileImage">Profile Image (Optional):</label>
              <input type="file" id="profileImage" accept="image/*" onChange={handleImageChange} />
              {imageUploadError && <p className="error">{imageUploadError}</p>}
              {profileImage && <p>Selected Image: {profileImage.name}</p>}
            </div>
            <div className="profile-actions">
              <Button className='button' onClick={handleSaveClick} disabled={loading}>
                {loading ? 'Saving...' : 'Save'}
              </Button>
              <Button className='button' onClick={handleCancelClick} disabled={loading}>
                Cancel
              </Button>
            </div>
          </form>
        ) : (
          <>
            {user?.profileImage && (
              <img
                src={`http://localhost:3000/uploads/${user.profileImage.split('/').pop()}`}
                alt="Profile"
                className="profile-image"
              />
            )}
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <Button className='button' onClick={handleEditClick}>Edit Profile</Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;