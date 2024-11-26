import React, { useState } from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import Eyewear from "../assets/For Front Eyewear.png";
import { HashLink } from "react-router-hash-link";
import { auth, db } from "../firebase.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Sign_up = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
    phoneNum: ""
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loading overlay
    try {
      // Create user with Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const userId = userCredential.user.uid;

      // Add user data to Firestore
      await setDoc(doc(db, "users", userId), {
        name: formData.firstName,
        surname: formData.lastName,
        email: formData.email,
        gender: formData.gender,
        dob: formData.birthDate,
        phoneNum: formData.phoneNum,
        imageUrl:
          "https://firebasestorage.googleapis.com/v0/b/eventhub-d219a.appspot.com/o/Profile.jpg?alt=media&token=263800d2-4d4d-4265-9e4a-cd9b3aa8638f",
        pocket_money: 0,
      });

      alert("Account created successfully!");

      navigate(`/#top`);
  } catch (err) {
    // Check for Firebase error codes
    if (err.code === "auth/email-already-in-use") {
      setError("This email is already registered. Please use a different email.");
    } else if (err.code === "auth/weak-password") {
      setError("Password is too weak. Please choose a stronger password.");
    } else if (err.code === "auth/invalid-email") {
      setError("Invalid email address. Please check and try again.");
    } else {
      // For other errors, use a generic message
      setError("Error creating account. Please try again.");
    }
    console.error(err); // Log the full error for debugging
    } finally {
      setIsLoading(false); // Hide loading overlay
    }
  };

  return (
    <div className="relative">
      {/* Loading Overlay */}
      {isLoading && (
        <div className="overlay flex items-center justify-center">
          <div className="loader"></div>
        </div>
      )}
      <div className="w-1/2 px-14 bg-white max-h-screen pt-6 testss rounded-tr-[30px] rounded-br-[30px] -space-y-8">
        <HashLink smooth to="/#top" className="flex items-center text-display-1 font-headline">
          <div className="flex items-center mb-8">
            <img src={logo} alt="EventHub logo" className="mr-4 w-12 h-12" />
            <button className="heading2 text-primary mt-1">EventHub</button>
          </div>
        </HashLink>
        <div>
          <h1 className="heading1 mb-8">Create an account</h1>
          {error && <p className="text-red-500 pb-5">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="flex gap-4 mb-6 max-w-h">
              <div className="flex-1">
                <label className="block text-black mb-2 max-w heading3">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-black mb-2 max-w max-w-h heading3">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder=""
                  className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                  required
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block heading3 mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block heading3 mb-2">Phone Number</label>
              <input
                name="phoneNum"
                value={formData.phoneNum}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                required
              />
            </div>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <label className="block text-black mb-2 heading3">Gender</label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className={`${
                    formData.gender !== "" ? "text-black" : "text-lightgray"
                  } w-full px-4 py-3 rounded-lg border border-lightgray shadow-md`}
                >
                  <option value="" disabled>Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block mb-2 heading3">Birthdate</label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate}
                  onChange={handleChange}
                  className={`${
                    formData.birthDate !== "" ? "text-black" : "text-lightgray"
                  } w-full px-4 py-3 rounded-lg border border-lightgray shadow-md`}
                />
              </div>
            </div>
            <div className="mb-6">
              <label className="block heading3 mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder=""
                className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                required
              />
            </div>
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="mt-3.5" required />
              <span className="paragraph2">Agree to our Terms, Privacy Policy, and Cookies Policy.</span>
            </div>
            <div className="flex items-center gap-4">
              <button type="submit" className="bg-primary text-white text-[20px] font-bold px-20 py-3 rounded-full hover:bg-primary">
                Sign Up
              </button>
              <HashLink smooth to="/Login" className="paragraph2 text-primary">
                Log in
              </HashLink>
            </div>
          </form>
        </div>
      </div>
      <div className="rounded-[10px] tests">
        <img src={Eyewear} alt="For Front Eyewear" className="w-full h-full object-cover" />
      </div>
    </div>
  );
};

export default Sign_up;
