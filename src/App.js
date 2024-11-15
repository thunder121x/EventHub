import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Homepage from "./components/Homepage";
import Reservation from "./components/Reservation";
import AboutUs from "./components/AboutUs";
import Login from "./components/Login";
import FilterPageWithState from "./components/FilterPage";
import EWallet from "./components/Ewallet";
import EventDetail from "./components/EventDetail";
import Sign_up from "./components/Sign_up";
import ReservationConfirmation from "./components/ReservationConfirmation";
import EditProfile from "./components/Edit_profile";
import BookingHistory from "./components/Bookinghistory";

function App() {
  const [navbarBg, setNavbarBg] = useState(false);
  const [navbarShowOff, setNavbarShowOff] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const updateNavbarBg = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

      // Set navbar background on initial load and scroll
      setNavbarBg(
        window.scrollY > headerHeight ||
          ["/E-Wallet", "/EventDetail"].includes(location.pathname)
      );

      setNavbarShowOff(
        ![
          "/Login",
          "/SignUp",
          "/Reservation",
          "/ReservationConfirmation",
        ].includes(location.pathname)
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
      <Navbar isScrolled={navbarBg} onShowing={navbarShowOff} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/Reservation" element={<Reservation />} />
        <Route
          path="/ReservationConfirmation"
          element={<ReservationConfirmation />}
        />
        <Route path="/SearchBar" element={<Homepage />} />
        <Route path="/ExploreWorkshops" element={<Homepage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/SignUp" element={<Sign_up />} />
        <Route path="/Filter" element={<FilterPageWithState />} />
        <Route path="/Profile" element={<EditProfile />} />
        <Route path="/Profile-EditProfile" element={<EditProfile />} />
        <Route path="/Profile-BookingHistory" element={<BookingHistory />} />
        <Route path="/Profile-E-Wallet" element={<EWallet />} />
        <Route path="/EventDetail" element={<EventDetail />} />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
