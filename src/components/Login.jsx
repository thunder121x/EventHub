import React from "react";
import "../styles.css";
import login_bg from "../assets/header.png";
import Profile from "../assets/Profile.jpg";
import { HashLink } from "react-router-hash-link";
import Navbar from "./Navbar.js";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Profile#top`, {
      state: {
      },
    });
  };
  return (
    <div>
    <Navbar isScrolled={false} onShowing={true}/>
    <div
      style={{
        backgroundImage: `url(${login_bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
      className="min-h-screen flex items-center justify-center p-4 restrictedFeature"
    >
      <div className="max-w-lg max-h-fit w-full space-y-2 bg-white p-8 rounded-lg shadow-lg overlayForm">
        <HashLink
          smooth
          to="/#top"
          className="flex items-center text-display-1 font-headline"
        >
        <div className="flex items-center">
          <img src={logo} alt="EventHub logo" className="mr-2 w-8 h-8" />
          <button className="paragraph2 text-primary mt-1">EventHub</button>
        </div>
        </HashLink>
        {/* Circular Image */}
        <div className="flex justify-center">
          <div className="w-[137px] h-[137px] overflow-hidden rounded-full ">
            <img
              src={Profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Login Text */}
        <h2 className="mt-6  text-center heading1">Log in</h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-8 space-y-6 mx-10">
          <div className="space-y-4 rounded-lg">
            <div>
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-3 py-2 border-b-2 border-primary focus:border-primary outline-none transition-colors text-[15px] font-bold text-gray"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 border-b-2 border-primary focus:border-primary outline-none transition-colors text-[15px] font-bold text-gray"
                required
              />
            </div>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-primary hover:text-primary paragraph2">
              Forgot Password?
            </a>
          </div>

          <div className="flex justify-center">
            {/* Login Button */}
            <button
              type="submit"
              className="w-1/2 py-3 px-4 bg-primary hover:bg-primary text-white items-center navtext rounded-full transition-colors"
            >
              Log in
            </button>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <span className="paragraph2">
              Not a member? </span>
            <HashLink smooth to="/SignUp" className="paragraph2 text-primary hover:text-secondary">
              Sign up now
            </HashLink>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
