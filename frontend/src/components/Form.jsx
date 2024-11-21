import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function UnifiedForm({ route, method, isBooking }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const formTitle = isBooking
    ? "Reserve a Table"
    : method === "login"
    ? "Login"
    : "Register";

  useEffect(() => {
    if (!isBooking) {
      const token = localStorage.getItem(ACCESS_TOKEN);
      setIsLoggedIn(!!token);
    }
  }, [isBooking]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = isBooking
        ? { date, time, guests }
        : method === "login"
        ? { username, password }
        : { username, email, password, confirmPassword };

      const response = await api.post(route, payload);

      if (!isBooking && method === "login") {
        localStorage.setItem(ACCESS_TOKEN, response.data.access);
        localStorage.setItem(REFRESH_TOKEN, response.data.refresh);
        setIsLoggedIn(true);
        navigate("/");
      } else if (!isBooking) {
        navigate("/login");
      } else {
        alert("Reservation successful!");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <div className="unified-form-container">
      {isLoggedIn && !isBooking ? (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      ) : (
        <form onSubmit={handleSubmit} className="unified-form">
          <h1>{formTitle}</h1>
          {!isBooking && (
            <>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  className="form-input"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Username"
                  required
                />
              </div>
              {method === "register" && (
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />
                </div>
              )}
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                />
              </div>
              {method === "register" && (
                <div className="input-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    className="form-input"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm Password"
                    required
                  />
                </div>
              )}
            </>
          )}
          {isBooking && (
            <>
              <div className="input-group">
                <label htmlFor="date">Date</label>
                <input
                  type="date"
                  id="date"
                  className="form-input"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="time">Time</label>
                <input
                  type="time"
                  id="time"
                  className="form-input"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="guests">Number of Guests</label>
                <input
                  type="number"
                  id="guests"
                  className="form-input"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  min="1"
                  required
                />
              </div>
            </>
          )}
          <button
            className="unified-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Loading..." : formTitle}
          </button>
        </form>
      )}
    </div>
  );
}

export default UnifiedForm;
