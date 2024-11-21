import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import ComingSoon from './CommingSoon';
import '../styles/Comingsoon.css';
import Footer from '../components/Footer';

function Cart() {
  return (
    <>
        <Header />
        <ComingSoon />
        <Footer />
    </>
    

  );
}

export default Cart;
