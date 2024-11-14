import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import Eyewear from "../assets/For Front Eyewear.png";
import FB from "../assets/facebook.png";
import Google from "../assets/google.png";

const Sign_up = () => {
  return (
    <div className="flex h-screen">
      {/* Left Section */}
      <div className="w-1/2 p-14 bg-white max-h-screen">
        {/* Logo Header */}
        <div className="flex items-center mb-16">
          <img src={logo} alt="EventHub logo" className="mr-4 w-10 h-10" />
          <button className="navtext text-primary ">EventHub</button>
        </div>

        {/* Main Form Content */}
        <div>
          <h1 className="text-4xl font-bold mb-8">Create an account</h1>

          <form>
            {/* Name Fields */}
            <div className="flex  gap-4 mb-6 max-w-h">
              <div className="flex-1">
                <label className="block text-gray mb-2 max-w">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full px-4 py-3 rounded-lg border border-gray"
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray mb-2 max-w max-w-h">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full px-4 py-3 rounded-lg border border-gray"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                placeholder="JohnDoe@gmail.com"
                className="w-full px-4 py-3 rounded-lg border border-gray"
              />
            </div>

            {/* Password Field */}
            <div className="mb-6">
              <label className="block text-gray mb-2">Password</label>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-lg border border-gray"
              />
            </div>

            {/* Divider */}
            <div className="text-center my-8 font-bold">-OR-</div>

            {/* Social Login Buttons */}
            <div className="flex flex-col items-center space-y-4 mb-6">
              {" "}
              {/* Changed this line */}
              <button className="w-3/4 flex items-center justify-center gap-3 px-4 py-3 border border-gray rounded-lg hover:bg-gray-50">
                <img src={Google} alt="Google" className="w-6 h-6" />
                Sign up with Google
              </button>
              <button className="w-3/4 flex items-center justify-center gap-3 px-4 py-3 border border-gray rounded-lg hover:bg-gray-50">
                <img src={FB} alt="FB" className="w-6 h-6" />
                Sign up with Facebook
              </button>
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-2 mb-6">
              <input type="checkbox" className="mt-1" />
              <span className="text-sm text-gray">
                Agree to our Terms, Privacy Policy and Cookies Policy.
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-4">
              <button className="bg-primary text-white text-[20px] font-bold px-20 py-3 rounded-full hover:bg-primary">
                Sign Up
              </button>
              <a href="#" className="text-prbg-primary hover:text-primary">
                Log in
              </a>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-1/2 relative rounded-[10px]">
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
