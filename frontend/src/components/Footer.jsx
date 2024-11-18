import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-section logo-name">
        <div className="logo">🍋</div>
        <div className="footer-name">LITTLE LEMON</div>
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
          <span>📘</span>
          <span>📷</span>
          <span>🐦</span>
          <span>🎥</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
