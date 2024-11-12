import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Homepage from "./components/Homepage";
import Reservation_1 from "./components/Reservation_1";
import ReservationManyPeople from "./components/ReservationManyPeople";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import FilterPageWithState from "./components/FilterPage";

function App() {
  const [navbarBg, setNavbarBg] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector("header");
      if (header) { // Check if header exists
        const headerHeight = header.offsetHeight;
        setNavbarBg(window.scrollY > headerHeight);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Router>
      <div className="bg-background min-h-screen">
        <Navbar isScrolled={navbarBg} />
        <Routes>
          <Route path="/" element={<Homepage />} />
          {/* <Route path="/reservation" element={<Reservation_1 />} />
          <Route path="/reservation-many" element={<ReservationManyPeople />} /> */}
          <Route path="/SearchBar" element={<Homepage />} />
          <Route path="/ExploreWorkshops" element={<Homepage />} />
          <Route path="/AboutUs" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/filterpage" element={<FilterPageWithState/>} />
        </Routes>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
