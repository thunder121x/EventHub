import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import EWallet from "./components/Ewallet";
import EventDetail from "./components/EventDetail";
import Sign_up from "./components/Sign_up";

function App() {
  const [navbarBg, setNavbarBg] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateNavbarBg = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

      // Set navbar background on initial load and scroll
      setNavbarBg(
        window.scrollY > headerHeight ||
          ["/ewallet", "/EventDetail"].includes(location.pathname)
      );
    };

    updateNavbarBg(); // Call the function on initial load

    window.addEventListener("scroll", updateNavbarBg);
    return () => {
      window.removeEventListener("scroll", updateNavbarBg);
    };
  }, [location.pathname]);

  return (
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
        <Route path="/signup" element={<Sign_up />} />
        <Route path="/filterpage" element={<FilterPageWithState />} />
        <Route path="/ewallet" element={<EWallet />} />
        <Route path="/EventDetail" element={<EventDetail />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
