import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import Eyewear from "../assets/For Front Eyewear.png";
import FB from "../assets/facebook.png";
import Google from "../assets/google.png";
import { HashLink } from "react-router-hash-link";

const Sign_up = () => {
  return (
    <div className="">
      {/* Left Section */}
      <div className="w-1/2 px-14 bg-white max-h-screen pt-14 testss rounded-tr-[30px] rounded-br-[30px]">
        {/* Logo Header */}
        <HashLink
          smooth
          to="/#top"
          className="flex items-center text-display-1 font-headline"
        >
        <div className="flex items-center mb-8">
          <img src={logo} alt="EventHub logo" className="mr-4 w-12 h-12" />
          <button className="heading2 text-primary mt-1">EventHub</button>
        </div>
        </HashLink>

        {/* Main Form Content */}
        <div>
          <h1 className="heading1 mb-8">Create an account</h1>

          <form>
            {/* Name Fields */}
            <div className="flex  gap-4 mb-6 max-w-h">
              <div className="flex-1">
                <label className="block text-black mb-2 max-w heading3">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-black mb-2 max-w max-w-h heading3">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block heading3 mb-2">Email</label>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block heading3 mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-lightgray shadow-md"
              />
            </div>

            {/* Divider */}
            <div className="text-center my-4 font-bold">-OR-</div>

            {/* Social Login Buttons */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              {" "}
              {/* Changed this line */}
              <button className="w-3/4 flex items-center justify-center gap-3 px-4 py-3 border border-lightgray shadow-md rounded-lg hover:bg-background">
                <img src={Google} alt="Google" className="w-6 h-6" />
                Sign up with Google
              </button>
              <button className="w-3/4 flex items-center justify-center gap-3 px-4 py-3 border border-lightgray shadow-md rounded-lg hover:bg-background">
                <img src={FB} alt="FB" className="w-6 h-6" />
                Sign up with Facebook
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="mt-1" />
              <span className="paragraph2">
                Agree to our Terms, Privacy Policy and Cookies Policy.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-primary text-white text-[20px] font-bold px-20 py-3 rounded-full hover:bg-primary">
                Sign Up
              </button>
              <HashLink smooth to="/Login" className="paragraph2 text-primary">
                Log in
              </HashLink>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="rounded-[10px] tests">
        <img
          src={Eyewear}
          alt="For Front Eyewear"
          className="w-full  h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Sign_up;
