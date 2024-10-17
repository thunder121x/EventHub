import logo from './logo.svg';
import './App.css';
// import React from 'react';
import React, { useState, useEffect } from "react";

import Navbar from './components/Navbar';
import Header from './components/Header';
import Footer from './components/Footer';
import Homepage from './components/Homepage';
import Reservation_1 from './components/Reservation_1';
import ReservationManyPeople from './components/ReservationManyPeople';

function App() {
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const headerHeight = document.querySelector("header").offsetHeight;
      if (window.scrollY > headerHeight) {
        setNavbarBg(true); // User has scrolled past the header
      } else {
        setNavbarBg(false); // User is still in the header area
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup on unmount
    };
  }, []);
  return (
    <div className="bg-background min-h-screen">
      <Navbar isScrolled={navbarBg} />
      <Homepage />
      <Reservation_1 />
      <ReservationManyPeople />
      
    </div>
  );
}

export default App;
