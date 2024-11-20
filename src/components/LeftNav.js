import "../styles.css";
import React, { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";
import { auth, db } from "../firebase"; // Make sure you import firebase setup
import { doc, getDoc } from "firebase/firestore";

function Navbar({ isScrolled, onShowing }) {
  const location = useLocation();
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
        } else {
          console.log("User not found in Firestore");
        }
      } else {
        setUser(null); // Set to null if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
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
        <HashLink
          smooth
          to="/#top"
          className="flex items-center text-display-1 font-headline"
        >
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />
          EventHub
        </HashLink>
        <ul className="flex space-x-8">
          <li>
            <HashLink smooth to="/#SearchBar" className="hover:text-secondary">
              Search Bar
            </HashLink>
          </li>
          <li>
            <HashLink
              smooth
              to="/#ExploreWorkshops"
              className="hover:text-secondary"
            >
              Explore Workshops
            </HashLink>
          </li>
          <li>
            <HashLink smooth to="/AboutUs#top" className="hover:text-secondary">
              About Us
            </HashLink>
          </li>
          <li>
            {/* Conditionally render the Login button or user image */}
            {user ? (
              <HashLink
                smooth
                to="/Profile"
                className="flex items-center gap-2 hover:text-secondary"
              >
                <img
                  src={user.imageUrl}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
              </HashLink>
            ) : (
              <HashLink smooth to="/Login" className="hover:text-secondary">
                Login
              </HashLink>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
