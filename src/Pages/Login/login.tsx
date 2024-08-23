import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './login-styles.css';
import InputField from '../../Components/Input/input';
import Button from '../../Components/Button/button';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import ErrorAlert from '../../Components/ErrorAlert/errorAlert';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home');
    } catch (error: any) {
      setError('Error logging in: ' + error.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-avatar">
          <Avatar alt="User Avatar" sx={{ width: 80, height: 80, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
        </div>
        <form onSubmit={handleLogin}>
          <InputField
            label="Email ID"
            type="text"
            isPassword={false}
            showPassword={false}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            label="Password"
            type="password"
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            isPassword={true}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <ErrorAlert message={error} />}
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a>Forgot Password?</a>
          </div>
          <Button type="submit">LOGIN</Button>
        </form>
        <div className="signup-link">
          <span>Don't have an account? </span>
          <Link to="/sign-up">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
