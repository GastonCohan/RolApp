import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import './login-styles.css';
import InputField from '../../Components/Input/input';
import Button from '../../Components/Button/button';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-avatar">
          <Avatar alt="User Avatar" sx={{ width: 80, height: 80, bgcolor: 'rgba(255, 255, 255, 0.3)' }} />
        </div>
        <form>
          <InputField
            label="Email ID"
            type="text"
            showPassword={false}
            isPassword={false}
          />
          <InputField
            label="Password"
            type="password"
            showPassword={showPassword}
            handleClickShowPassword={handleClickShowPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            isPassword={true}
          />
          <div className="login-options">
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
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
