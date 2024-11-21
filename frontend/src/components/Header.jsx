import React, { useState, useEffect } from 'react';
import logo from '../assets/images/logo.png';
import '../styles/Header.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { ACCESS_TOKEN } from '../constants';
import { FaShoppingCart } from 'react-icons/fa'; 
import axios from 'axios'; 

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState(0); 
  const [reservations, setReservations] = useState([]); 

  
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    setIsLoggedIn(!!token);


    if (token) {
      fetchUserReservations(token);
    } else {
      setReservations([]);
    }
  }, [location.pathname]);

 
  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(cartData.length);
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
    <header className="header">
      <div className="logo-container" onClick={() => navigate('/')}>
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

      {/* Cart icon */}
      <div className="cart-container" onClick={() => navigate('/cart')}>
        <FaShoppingCart className="cart-icon" />
        {cartItems > 0 && <span className="item-count">{cartItems}</span>}
      </div>

      {/* Reservations dropdown */}
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

      {/* Conditional login/logout button */}
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
  );
};

export default Header;
