import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import './header-styles.css';

const Header: React.FC = () => {
  const { role } = useAuth();

  return (
    <header className="header-container">
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          {role === 'admin' && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
