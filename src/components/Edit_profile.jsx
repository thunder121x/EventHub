import React, { useState, useEffect } from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import profile from "../assets/Profile.jpg";
import LeftNav from "./LeftNav";
import { auth, db } from "../firebase"; // Ensure you import Firebase setup
import { updateEmail } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    surname: "",
    email: "",
    phoneNum: "",
  });
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
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch current user data from Firestore on component mount
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);
          if (userDoc.exists()) {
            setUserData({
              name: userDoc.data().name,
              surname: userDoc.data().surname,
              email: userDoc.data().email,
              phoneNum: userDoc.data().phoneNum,
            });
          }
        } catch (err) {
          console.error("Error fetching user data:", err);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = auth.currentUser;

    try {
      if (user) {
        // Update Firebase Authentication email
        if (user.email !== userData.email) {
          await updateEmail(user, userData.email);
        }

        // Update Firestore user data
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          name: userData.name,
          surname: userData.surname,
          email: userData.email,
          phoneNum: userData.phoneNum,
        });

        setLoading(false);
        alert("Profile updated successfully!");
      }
    } catch (err) {
      setLoading(false);
      setError(err.message); // Display the specific error message
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-whitex font-sans">
      {/* Loading Overlay */}
      {loading && (
        <div className="overlay">
          <div className="loader"></div>
        </div>
      )}

      {/* Top Navigation Bar */}
      <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
        <div className="flex items-center">
          {/* logo */}
          <img src={logo} alt="EventHub logo" className="mr-2 w-10 h-10" />
          <button className="navtext font-bold">EventHub</button>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="navtext">
            Search Bar
          </a>
          <a href="#" className="navtext">
            Explore Workshops
          </a>
          <a href="#" className="navtext">
            About Us
          </a>
          <div className="w-8 h-8 rounded-full bg-whitex overflow-hidden">
            <img
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </nav>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <LeftNav />

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <h1 className="text-primary heading2 mb-6">Profile Information</h1>
          <div className="border-b border-lightgray mb-8"></div>

          <form
            className="max-w-3xl justify-center items-center"
            onSubmit={handleSubmit}
          >
            {error && <p className="text-red-500 mb-4">{error}</p>} {/* Display the specific error */}

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">First Name</label>
                <input
                  type="text"
                  name="name"
                  value={userData.name || ""}
                  onChange={handleChange}
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder={user ? user.name : "Loading..."}
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  name="surname"
                  value={userData.surname || ""}
                  onChange={handleChange}
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder={user ? user.surname : "Loading..."}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={userData.email || ""}
                  onChange={handleChange}
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder={user ? user.email : "Loading..."}
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Phone Number</label>
                <input
                  type="tel"
                  name="phoneNum"
                  value={userData.phoneNum || ""}
                  onChange={handleChange}
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder={user ? user.phoneNum : "Loading..."}
                />
              </div>
            </div>

            <div className="flex justify-end items-end pr-20">
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary h-8 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
