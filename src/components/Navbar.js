// import React from 'react';
import '../styles.css';
import React from 'react';

function Navbar({ isScrolled }) {
  return (
    // <nav className="bg-primary text-white p-4 fixed top-0 left-0 w-full z-10">
    //   <div className="container mx-auto flex justify-between items-center">

    <nav
      className={`${isScrolled ? "bg-primary" : ""} 
        ${isScrolled ? "text-white" : "text-white"}
        p-4 fixed top-0 left-0 w-full z-10 transition-colors duration-300`}
    >
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-display-1 font-headline">
          EventHub
        </a>
        <ul className="flex space-x-8">
          <li>
            <a
              href="/about"
              className="text-heading-3 font-poppins hover:text-secondary"
            >
              Search bar
            </a>
          </li>
          <li>
            <a
              href="/services"
              className="text-heading-3 font-poppins hover:text-secondary"
            >
              Explore Workshops
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-heading-3 font-poppins hover:text-secondary"
            >
              About Us
            </a>
          </li>
          <li>
            <a
              href="/contact"
              className="text-heading-3 font-poppins hover:text-secondary"
            >
              Login
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
