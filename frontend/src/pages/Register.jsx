// import React from 'react';
// import Header from '../components/Header';
// import '../styles/Register.css';
import Footer from "../components/Footer"

// function Register() {
//     return (
//         <div>
//             <Header />
//             <div className="login-container">
//                 <h1>Register</h1>
//                 <form>
//                     <div className="input-group">
//                         <label htmlFor="username">Username</label>
//                         <input type="text" id="username" placeholder="Enter your username" />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="email">Email</label>
//                         <input type="email" id="email" placeholder="Enter your email address" />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="password">Password</label>
//                         <input type="password" id="password" placeholder="Enter your password" />
//                     </div>
//                     <div className="input-group">
//                         <label htmlFor="confirm-password">Confirm Password</label>
//                         <input type="password" id="confirm-password" placeholder="Confirm your password" />
//                     </div>
//                     <div className="register-link">
//                         <span>Already have an account? </span>
//                         <a href="/login">Login</a>
//                     </div>
//                     <button type="submit" className="login-button">Register</button>
//                 </form>
//             </div>
//             <Footer />
//         </div>
//     );
// }

// export default Register;


import React from 'react';
import Header from '../components/Header';
import Form from '../components/Form';

function Register() {
    return (
        <div>
            <Header />
            <Form route='/api/user/register/' method="register" />
            <Footer />
        </div>
    );
}

export default Register;
