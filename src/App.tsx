import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './Components/protectedRoute';
import Home from './Pages/Home/home';
import Login from './Pages/Login/login';
import SignUp from './Pages/SignUp/signUp';
import { AuthProvider, useAuth } from './Context/authContext';

const App: React.FC = () => {
  const {user } = useAuth();

  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/home" /> : <Login />} />
        <Route path="/sign-up" element={user ? <Navigate to="/home" /> : <SignUp />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        {/* <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPage />
            </ProtectedRoute>
          }
        /> */}
        <Route path="*" element={<Navigate to={user ? "/home" : "/login"} />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
