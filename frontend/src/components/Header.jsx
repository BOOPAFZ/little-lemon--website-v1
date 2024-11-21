import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import { FaShoppingCart } from 'react-icons/fa'; 
import axios from 'axios'; // Import axios for making API calls

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0); 
  const [reservations, setReservations] = useState([]); 
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  // Check for token in localStorage to determine login status
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);

    // Fetch reservations if user is logged in
    if (token) {
      fetchUserReservations(token);
    } else {
      setReservations([]);
    }
  }, [location.pathname]);

  // Set up cart items count from localStorage
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(cartData.length);
  }, []);

  // Scroll effect for sticky navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchUserReservations = async (token) => {
    try {
      const response = await axios.get('/api/reservation/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (Array.isArray(response.data)) {
        setReservations(response.data); 
      } else {
        console.error('Unexpected API response:', response.data);
        setReservations([]); 
      }
    } catch (error) {
      console.error('Error fetching reservations:', error);
      setReservations([]); 
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    setIsLoggedIn(false);
    navigate('/');
  };

  return (
    <>
      <div className={`hamburger ${isNavOpen ? 'open' : ''}`} onClick={() => setIsNavOpen(!isNavOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <header className={`header ${isNavOpen ? 'open' : ''} ${isSticky ? 'sticky' : ''}`}>
        <div className="logo-container" onClick={() => navigate('/')}>
          <img src={logo} alt="Logo" className="logo" />
          <span className="logo-text">little lemon</span>
        </div>

        <nav className={`nav ${isNavOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item" onClick={() => navigate('/')}>Home</li>
            <li className="nav-item" onClick={() => navigate('/about')}>About</li>
            <li className="nav-item" onClick={() => navigate('/menu')}>Menu</li>
            <li className="nav-item" onClick={() => navigate('/book')}>Book</li>
          </ul>
        </nav>

        <div className="cart-container" onClick={() => navigate('/cart')}>
          <FaShoppingCart className="cart-icon" />
          {cartItems > 0 && <span className="item-count">{cartItems}</span>}
        </div>

        {isLoggedIn && reservations.length > 0 && (
          <div className="reservations-dropdown">
            <button className="reservations-button">
              Your Reservations
            </button>
            <ul className="reservations-list">
              {reservations.map((reservation, index) => (
                <li key={index} className="reservation-item">
                  {`Reservation for ${reservation.date} at ${reservation.time}, ${reservation.number_of_people} people`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {isLoggedIn ? (
          <button className="login-button" onClick={handleLogout}>
            Logout
          </button>
        ) : location.pathname !== '/login' ? (
          <button className="login-button" onClick={() => navigate('/login')}>
            Login
          </button>
        ) : (
          <button className="login-button" onClick={() => navigate('/register')}>
            Register
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
