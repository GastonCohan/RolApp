import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import LoadingSpinner from '../../Components/LoadingSpinner/loadingSpinner';

const Home: React.FC = () => {
  const { role, logout, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <LoadingSpinner />;
  }

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <p>Welcome! You are logged in as: <strong>{role}</strong></p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
