import React from "react";
import headerImage from "../assets/header.png";
import "../styles.css";

const Header = () => {
  return (
    // <header className="bg-blue-600 text-white text-center py-10" style="background-image: url('../assets/header.png');">
    <header
      className="bg-primary text-white text-center py-10"
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "720px",
        display: "flex", // Enable Flexbox
        flexDirection: "column", // Stack items vertically
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
    >
      <div>
        <h1 className="display1">Welcome to EventHub</h1>
        <p className="text-[24px]">Thailand's Premier Local Workshop Hub</p>
      </div>
    </header>
  );
};

export default Header;
