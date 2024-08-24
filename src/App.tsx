import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Context/protectedRoute';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import SignUp from './Pages/SignUp/signUp';
import { AuthProvider, useAuth } from './Context/authContext';
import AdminPanel from './Pages/AdminPanel/adminPanel';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<LoginRedirect />} />
        <Route path="/sign-up" element={<SignUpRedirect />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </AuthProvider>
  );
};

const LoginRedirect: React.FC = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/home" /> : <Login />;
};

const SignUpRedirect: React.FC = () => {
  const { user } = useAuth();
  return user ? <Navigate to="/home" /> : <SignUp />;
};

export default App;
