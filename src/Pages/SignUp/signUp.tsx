import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import Checkbox from '@mui/material/Checkbox';
import './signUp-styles.css';
import InputField from '../../Components/Input/input';
import Button from '../../Components/Button/button';
import db, { auth } from '../../firebaseConfig';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [role, setRole] = useState('guest');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const passwordInputRef = useRef<HTMLInputElement>(null);
  const repeatPasswordInputRef = useRef<HTMLInputElement>(null);

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleClickShowRepeatPassword = () => setShowRepeatPassword((prev) => !prev);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => event.preventDefault();
  const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => setRole(event.target.value);
  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => setAcceptedTerms(event.target.checked);

  const handleBack = () => {
    navigate('/login');
  };

  const handleSignUp = async (event: React.FormEvent) => {
    event.preventDefault();
  
    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }
  
    if (!acceptedTerms) {
      alert('You must accept the terms and conditions');
      return;
    }
  
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        role: role,
      });
  
      navigate('/login');
    } catch (error: any) {
      console.error('Error creating user:', error);
      alert('Error signing up: ' + error.message);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="header">
          <IconButton onClick={handleBack} className="back-button">
            <ArrowBackIcon />
          </IconButton>
          <Avatar alt="User Avatar" className="avatar" />
        </div>
        <form onSubmit={handleSignUp}>
          <InputField
            label="Email ID"
            type="text"
            isPassword={false}
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
            inputRef={passwordInputRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputField
            label="Repeat Password"
            type="password"
            showPassword={showRepeatPassword}
            handleClickShowPassword={handleClickShowRepeatPassword}
            handleMouseDownPassword={handleMouseDownPassword}
            isPassword={true}
            inputRef={repeatPasswordInputRef}
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
          <FormControl component="fieldset" className="role-selector">
            <FormLabel component="legend" className="form-label">Select Role</FormLabel>
            <RadioGroup
              aria-label="role"
              value={role}
              onChange={handleRoleChange}
              className="radio-group-horizontal"
              style={{ flexDirection: 'row' }}
            >
              <FormControlLabel value="guest" control={<Radio className="radio" />} label="Guest" />
              <FormControlLabel value="admin" control={<Radio className="radio" />} label="Admin" />
            </RadioGroup>
          </FormControl>
          <FormControlLabel
            control={<Checkbox checked={acceptedTerms} onChange={handleTermsChange} className="checkbox" />}
            label="I accept the terms and conditions"
            className="terms-checkbox"
          />
          <Button type="submit">SIGN UP</Button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
