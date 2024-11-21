import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Footer.css';
import logo from '../assets/images/logo.png';


import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate(); 

  return (
    <footer className="footer">
      <div className="logo-container" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="logo" />
        <span className="logo-text">Little Lemon</span>
      </div>
      <div className="footer-section sitemap">
        <h3>Sitemap</h3>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Menu</li>
          <li>Reservations</li>
          <li>Order Online</li>
          <li>Login</li>
        </ul>
      </div>
      <div className="footer-section contact">
        <h3>Contact Us</h3>
        <ul>
          <li>Address: 123 Fake Ave, Chicago, IL 60602</li>
          <li>Phone: +1 (012) 345-6789</li>
          <li>Email: info@littlelemon.com</li>
        </ul>
      </div>
      <div className="footer-section connect">
        <h3>Connect With Us</h3>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="social-icon" />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="social-icon" />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <FaTwitter className="social-icon" />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
            <FaYoutube className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
