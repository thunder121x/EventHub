import React, { Profiler, useEffect, useState } from "react";
import "../styles.css";
import profile from "../assets/Profile.jpg";
import { auth, db } from "../firebase"; // Ensure you import Firebase setup
import { doc, getDoc } from "firebase/firestore";
import { getAuth, signOut } from "firebase/auth";

const LeftNav = () => {
  const [user, setUser] = useState(null); // State to store user info

  const handleLogout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log("User successfully logged out.");
      window.location.href = "/login"; // Redirect to login page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

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
  return (
    <aside className="w-1/4 p-8 flex flex-col items-center border-r border-lightgray mt-10">
      <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border">
        <img
          src={user ? user.imageUrl : profile}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>
      <h2 className="text-xl font-semibold mb-8">
        {user ? `${user.name + " " + user.surname}` : "Loading"}
      </h2>

      <nav className="w-full space-y-6">
        <a
          href="/Profile-EditProfile"
          className="flex items-center gap-3  text-primary transition-colors duration-200 hover:text-primary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path
              d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Edit Profile</span>
        </a>
        <a
          href="/Profile-BookingHistory"
          className="flex items-center gap-3 transition-colors duration-200 hover:text-primary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path
              d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M12 6V12L16 14"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>Booking History</span>
        </a>
        <a
          href="/Profile-E-Wallet"
          className="flex items-center gap-3  transition-colors duration-200 hover:text-primary"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-current"
          >
            <path
              d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M1 10H23"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>E-Wallet</span>
        </a>

        <button
          onClick={handleLogout}
          className="mt-8 px-6 py-3 rounded-full bg-red-600 text-white hover:bg-red-500"
        >
          Logout
        </button>
      </nav>
    </aside>
  );
};
export default LeftNav;
