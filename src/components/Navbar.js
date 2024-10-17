import "../styles.css";
import React from "react";
import logo from "../assets/logo.png"; // Make sure the path to the logo is correct

function Navbar({ isScrolled }) {
  return (
    <nav
      className={`${
        isScrolled ? "bg-white text-primary shadow-md" : "text-white text-shadow"
      } 
         p-4 fixed top-0 left-0 w-full z-10 transition-colors duration-300 navtext`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center text-display-1 font-headline">
          <img src={logo} alt="Logo" className="w-8 h-8 mr-2" />{" "}
          {/* Logo with some styling */}
          EventHub
        </a>
        <ul className="flex space-x-8">
          <li>
            <a href="/about" className="hover:text-secondary">
              Search bar
            </a>
          </li>
          <li>
            <a href="/services" className="hover:text-secondary">
              Explore Workshops
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-secondary">
              About Us
            </a>
          </li>
          <li>
            <a href="/contact" className="hover:text-secondary">
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
