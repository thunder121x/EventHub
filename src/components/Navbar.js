import "../styles.css";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { HashLink } from "react-router-hash-link";
import { useLocation, Link } from "react-router-dom";
import { auth } from "../firebase"; // Firebase auth configuration
import { onAuthStateChanged } from "firebase/auth";

function Navbar({ isScrolled, onShowing }) {
  const [user, setUser] = useState(null); // State สำหรับเก็บข้อมูลผู้ใช้
  const location = useLocation();

  // ตรวจสอบสถานะการล็อกอินของผู้ใช้
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // ถ้ามีผู้ใช้ล็อกอิน ให้เก็บข้อมูลของผู้ใช้
      } else {
        setUser(null); // ถ้าไม่มีผู้ใช้ล็อกอิน ให้ตั้งค่าเป็น null
      }
    });
    return () => unsubscribe(); // ทำการยกเลิกการติดตามเมื่อ component ถูก unmount
  }, []);

  if (!onShowing) {
    return <div></div>;
  }

  return (
    <nav
      className={`${
        [
          "/Profile",
          "/Profile-EditProfile",
          "/Profile-BookingHistory",
          "/Profile-E-Wallet",
        ].includes(location.pathname)
          ? "bg-primary text-white shadow-md"
          : isScrolled
          ? "bg-white text-primary shadow-md"
          : "text-white text-shadow"
      } p-4 fixed top-0 left-0 w-full 
       ${location.pathname === "/Login" ? "z-[1]" : "z-10"} 
        transition-colors duration-300 navtext`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* โลโก้ */}
        <div className="flex items-center">
          <HashLink
            smooth
            to="/#top"
            className="flex items-center text-display-1 font-headline"
          >
            <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
            EventHub
          </HashLink>
        </div>

        {/* เมนูทางขวา และโปรไฟล์ผู้ใช้ */}
        <div className="flex items-center space-x-4 ml-6">
          {/* เมนูทางขวา */}
          <div className="flex items-center space-x-6  ml-6">
            <HashLink smooth to="/#SearchBar" className="hover:text-secondary">
              Search Bar
            </HashLink>
            <HashLink
              smooth
              to="/#ExploreWorkshops"
              className="hover:text-secondary"
            >
              Explore Workshops
            </HashLink>
            <HashLink smooth to="/AboutUs#top" className="hover:text-secondary">
              About Us
            </HashLink>
          </div>

          {/* โปรไฟล์ผู้ใช้ */}
          <div className="flex items-center">
            {!user ? (
              <HashLink smooth to="/Login" className="hover:text-secondary">
                Login
              </HashLink>
            ) : (
              <Link to="/Profile-EditProfile">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/eventhub-d219a.appspot.com/o/Profile.jpg?alt=media&token=263800d2-4d4d-4265-9e4a-cd9b3aa8638f"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
