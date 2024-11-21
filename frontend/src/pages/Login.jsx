// import React from 'react';
// import Header from '../components/Header';
// import '../styles/Login.css';
// import { useNavigate } from 'react-router-dom';
// import Footer from "../components/Footer"

// function Login() {
//   const navigate = useNavigate(); // Initialize navigate

//   const handleLoginSubmit = (e) => {
//     e.preventDefault(); 
//     navigate('/');
//   };

//   return (
//     <div>
//       <Header />
//       <div className="login-container">
//         <h1>Login</h1>
//         <form onSubmit={handleLoginSubmit}> {/* Use onSubmit for form submission */}
//           <div className="input-group">
//             <label htmlFor="username">Username</label>
//             <input type="text" id="username" placeholder="Enter your username" />
//           </div>
//           <div className="input-group">
//             <label htmlFor="password">Password</label>
//             <input type="password" id="password" placeholder="Enter your password" />
//           </div>
//           <div className="register-link">
//             <span>Don't have an account? </span>
//             <a href="/register">Register</a>
//           </div>
//           <button type="submit" className="login-button">
//             Login
//           </button>
//         </form>
//       </div>
//       <Footer />
//     </div>
//   );
// }
import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';
import Footer from "../components/Footer"

function Login() {
    return (
        <div>
            <Header />
            <Form route='/api/token/' method="login" />
            <Footer />
        </div>
    );
}

export default Login;
