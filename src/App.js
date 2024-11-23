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
import { onAuthStateChanged } from "firebase/auth"; // สำหรับติดตามสถานะผู้ใช้
import { auth } from "./firebase"; // Path ของ Firebase configuration

function App() {
  const [navbarBg, setNavbarBg] = useState(false);
  const [navbarShowOff, setNavbarShowOff] = useState(false);
  const location = useLocation();
  const [currentUser, setCurrentUser] = useState(null); // เก็บสถานะผู้ใช้

  // ฟังก์ชันสำหรับติดตามสถานะการล็อคอิน
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user); // อัปเดตสถานะผู้ใช้เมื่อพบว่าผู้ใช้ล็อคอิน
      } else {
        setCurrentUser(null); // ตั้งค่าเป็น null เมื่อไม่มีผู้ใช้ล็อคอิน
      }
    });

    return () => unsubscribe(); // ทำการ cleanup listener เมื่อ component ถูก unmount
  }, []);

  // ฟังก์ชันจัดการ background ของ Navbar
  useEffect(() => {
    const updateNavbarBg = () => {
      const header = document.querySelector("header");
      const headerHeight = header ? header.offsetHeight : 0;

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

    updateNavbarBg(); // เรียกครั้งแรกตอนโหลดหน้า

    window.addEventListener("scroll", updateNavbarBg);
    return () => {
      window.removeEventListener("scroll", updateNavbarBg);
    };
  }, [location.pathname]);

  return (
    <div className="bg-background min-h-screen">
      {/* ส่ง currentUser ให้กับ Navbar */}
      <Navbar isScrolled={navbarBg} onShowing={navbarShowOff} user={currentUser} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route 
          path="/Reservation/:id" 
          element={<Reservation currentUser={currentUser} />} 
        />

        <Route
          path="/ReservationConfirmation"
          element={<ReservationConfirmation />}
        />
        <Route path="/SearchBar" element={<Homepage />} />
        <Route path="/ExploreWorkshops" element={<Homepage />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route
          path="/Login"
          element={<Login setUser={setCurrentUser} />} // ส่ง setUser ไปที่ Login
        />
        <Route path="/SignUp" element={<Sign_up />} />
        <Route path="/Filter" element={<FilterPageWithState />} />
        <Route
          path="/Profile"
          element={<EditProfile user={currentUser} />} // ส่ง currentUser ไปยัง EditProfile
        />
        <Route
          path="/Profile-EditProfile"
          element={<EditProfile user={currentUser} />}
        />
        <Route
          path="/Profile-BookingHistory"
          element={<BookingHistory user={currentUser} />}
        />
         <Route
          path="/EventDetail/:id"
          element={<EventDetail user={currentUser} />}
        />
        <Route
          path="/Profile-E-Wallet"
          element={<EWallet user={currentUser} />}
        />
      </Routes>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
