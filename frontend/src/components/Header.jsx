import React from 'react';
import logo from '../assets/images/logo.png';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation(); 

  return (
    <header className="header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">little lemon</span>
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => navigate('/')}>Home</li>
          <li className="nav-item" onClick={() => navigate('/about')}>About</li>
          <li className="nav-item" onClick={() => navigate('/menu')}>Menu</li>
          <li className="nav-item" onClick={() => navigate('/book')}>Book</li>
        </ul>
      </nav>
      
      {location.pathname !== '/login' ? (
        <button className="login-button" onClick={() => navigate('/login')}>
          Login
        </button>
      ) : (
        <button className="login-button" onClick={() => navigate('/register')}>
          Register
        </button>
      )}
    </header>
  );
};

export default Header;
