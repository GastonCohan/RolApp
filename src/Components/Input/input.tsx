import React from 'react';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './input-styles.css';

interface InputFieldProps {
  label: string;
  type: string;
  showPassword?: boolean;
  handleClickShowPassword?: () => void;
  handleMouseDownPassword?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  inputRef?: React.RefObject<HTMLInputElement>;
  isPassword?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type,
  showPassword,
  handleClickShowPassword,
  handleMouseDownPassword,
  inputRef,
  isPassword = false,
}) => {
  return (
    <TextField
      label={label}
      variant="outlined"
      fullWidth
      type={isPassword && showPassword ? 'text' : type}
      inputRef={inputRef}
      InputLabelProps={{ className: 'input-label' }}
      inputProps={{ className: 'input-text' }}
      className="input-field"
      InputProps={{
        endAdornment: isPassword && (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              className="icon-button"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default InputField;
