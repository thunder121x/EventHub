import React from "react";
import headerImage from "../assets/header.png";

const Header = () => {
  return (
    // <header className="bg-blue-600 text-white text-center py-10" style="background-image: url('../assets/header.png');">
    <header
      className="bg-primary text-white text-center py-10"
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "600px",
        display: "flex", // Enable Flexbox
        flexDirection: "column", // Stack items vertically
        justifyContent: "center", // Center vertically
        alignItems: "center", // Center horizontally
      }}
    >
      <div>
        <h1 className="text-4xl font-bold">Welcome to EventHub</h1>
        <p className="mt-4 text-lg">Thailand's Premier Local Workshop Hub</p>
      </div>
    </header>
  );
};

export default Header;
