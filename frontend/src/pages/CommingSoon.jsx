import React, { useState, useEffect } from 'react';

import '../styles/Comingsoon.css';

function ComingSoon() {

  const targetDate = new Date('2024-12-01T00:00:00');

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = targetDate - now;

    
      if (difference > 0) {
        const days = Math.floor(difference / (100 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({
          days,
          hours,
          minutes,
          seconds
        });
      } else {
        
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
      }
    };

   
    const interval = setInterval(calculateTimeLeft, 1000);

    
    calculateTimeLeft();

   
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="coming-soon-page">
      
      <div className="coming-soon-content">
        <h1 className="coming-soon-title">Coming Soon</h1>
        <p className="coming-soon-description">We are working hard to bring something amazing. Stay tuned!</p>
        <div className="countdown">
          <div className="countdown-item">
            <span className="countdown-time">{String(timeLeft.days).padStart(2, '0')}</span>
            <span className="countdown-label">Days</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span className="countdown-label">Hours</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span className="countdown-label">Minutes</span>
          </div>
          <div className="countdown-item">
            <span className="countdown-time">{String(timeLeft.seconds).padStart(2, '0')}</span>
            <span className="countdown-label">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoon;
