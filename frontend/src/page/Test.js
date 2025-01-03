"use strict";
// ! testing the useLocation and useNavigate hooks
// -----------------------------------------------
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useLocation, useNavigate } from 'react-router-dom';
// const VerifyEmail = () => {
//     const [message, setMessage] = useState('');
//     const location = useLocation();
//     const navigate = useNavigate();
//     useEffect(() => {
//         if (token) {
//             axios.get(`${import.meta.env.VITE_API_URL}/api/auth/verify-email/${token}`)
//                 .then(response => {
//                     setMessage('Email verified successfully!');
//                     // Save the JWT token and redirect to the dashboard
//                     localStorage.setItem('token', response.data);
//                     navigate('/dashboard');
//                 })
//                 .catch(error => {
//                     setMessage('Invalid or expired token');
//                 });
//         }
//     }, [location, navigate]);
//     return (
//         <div>
//             <h1>{message}</h1>
//         </div>
//     );
// };
// export default VerifyEmail;
