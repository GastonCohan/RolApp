import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
   <BrowserRouter basename={process.env.NODE_ENV === 'production' ? '/RolApp' : '/'}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
