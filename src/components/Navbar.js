import "../styles.css";
import React from "react";
import logo from "../assets/logo.png";
import { HashLink } from "react-router-hash-link";
import { useLocation } from "react-router-dom";

function Navbar({ isScrolled, onShowing }) {
  const location = useLocation();
  if (!onShowing) {
    return (<div></div>)
  }
  return (
    <nav
      className={`${
        isScrolled
          ? "bg-white text-primary shadow-md"
          : "text-white text-shadow"
      } p-4 fixed top-0 left-0 w-full 
       ${
        location.pathname === "/Login" ? "z-[1]" : "z-10"
      } 
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
            <HashLink smooth to="/Login" className="hover:text-secondary">
              Login
            </HashLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
