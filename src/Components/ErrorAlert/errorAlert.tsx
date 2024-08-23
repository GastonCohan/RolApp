import React from 'react';
import './errorAlert-styles.css';

interface ErrorAlertProps {
  message: string;
}

const ErrorAlert: React.FC<ErrorAlertProps> = ({ message }) => {
  return (
    <div className="error-alert">
      <p>{message}</p>
    </div>
  );
};

export default ErrorAlert;
