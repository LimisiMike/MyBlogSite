import React from 'react';
import { logout } from '../utils/api';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('token'); // Remove token from storage
      alert('Log Out Success!'); // Display flash message
      navigate('/login'); // Redirect to login page or another appropriate page
    } catch (error) {
      console.error('Logout failed:', error);
      // Handle logout failure if needed
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;