import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../Context/authContext';
import { handleLogout } from '../../Helpers/authHelper';
import './header-styles.css';

const Header: React.FC = () => {
  const { role } = useAuth();

  return (
    <header className="header-container">
      <nav className="header-nav">
        <ul className="left-menu">
          <li>
            <Link to="/home">Home</Link>
          </li>
          {role === 'admin' && (
            <li>
              <Link to="/admin">Admin Panel</Link>
            </li>
          )}
        </ul>
        <ul className="right-menu">
          <li>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
