import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../Context/authContext';
import LoadingSpinner from './LoadingSpinner/loadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <LoadingSpinner/>;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to="/home" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
