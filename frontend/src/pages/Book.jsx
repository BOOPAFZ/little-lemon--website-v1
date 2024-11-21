import React, { useState } from 'react';
import api from '../api';  
import { ACCESS_TOKEN } from '../constants';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../styles/BookPage.css'; 

const ReservationForm = () => {
  const [reservationDate, setReservationDate] = useState('');
  const [reservationTime, setReservationTime] = useState(''); 
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem(ACCESS_TOKEN));  
  const [isLoading, setIsLoading] = useState(false);  

  const handleSubmit = async (e) => {
    e.preventDefault();


    const data = {
      date: reservationDate,
      time: reservationTime,  
      number_of_people: numberOfPeople,
    };

    
    if (!isLoggedIn) {
      if (!guestName || !guestEmail) {
        setMessage("Guest name and email are required for non-authenticated users.");
        return;  
      }
      data.guest_name = guestName;
      data.guest_email = guestEmail;
    }


    console.log("Request Data:", data);

    setIsLoading(true);
    setMessage('');

    try {
      const response = await api.post("/api/reservation/", data);  
      setMessage(response.data.message);
   
      setReservationDate('');
      setReservationTime('');  
      setNumberOfPeople(1);
      setGuestName('');
      setGuestEmail('');
    } catch (error) {
      console.error("Error Details:", error);  
      if (error.response) {
        setMessage(error.response.data?.error || "An error occurred. Please try again.");
      } else {
        setMessage("An error occurred. Please try again.");
      }
    } finally {
      
      setIsLoading(false);
    }
  };

  return (
    <div className="reservation-form-page">
      <Header />
      <div className="reservation-form-container">
        <h1>Book a Reservation</h1>
        <form onSubmit={handleSubmit} className="reservation-form">
          <div className="form-group">
            <label htmlFor="reservationDate">Reservation Date:</label>
            <input
              type="date"
              id="reservationDate"
              value={reservationDate}
              onChange={(e) => setReservationDate(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="reservationTime">Reservation Time:</label> {/* Time input */}
            <input
              type="time"
              id="reservationTime"
              value={reservationTime}
              onChange={(e) => setReservationTime(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="numberOfPeople">Number of People:</label>
            <input
              type="number"
              id="numberOfPeople"
              value={numberOfPeople}
              onChange={(e) => setNumberOfPeople(e.target.value)}
              min="1"
              required
            />
          </div>

          {!isLoggedIn && (
            <>
              <div className="form-group">
                <label htmlFor="guestName">Guest Name:</label>
                <input
                  type="text"
                  id="guestName"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="guestEmail">Guest Email:</label>
                <input
                  type="email"
                  id="guestEmail"
                  value={guestEmail}
                  onChange={(e) => setGuestEmail(e.target.value)}
                  required
                />
              </div>
            </>
          )}

          <button type="submit" className="submit-btn" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit Reservation"}
          </button>
        </form>
        {message && <div className="message">{message}</div>}
      </div>
      <Footer />
    </div>
  );
};

export default ReservationForm;
