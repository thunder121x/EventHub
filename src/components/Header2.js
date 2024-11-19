import React from "react";
import headerImage from "../assets/header2.png";
import "../styles.css";

const Header2 = () => {
  return (
    <header
      className="bg-primary text-white text-center py-10"
      style={{
        backgroundImage: `url(${headerImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "720px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start", // Align content to the left
        paddingLeft: "50px", // Add left padding for spacing from the edge
      }}
    >
      <div>
        <h1 className="display1 text-left p-[20px]">About us</h1>
        <div
          style={{
            maxWidth: "600px",
            padding: "20px",
            // backgroundColor: "rgba(0, 0, 0, 0.6)", // Semi-transparent background for readability
            borderRadius: "10px",
            textAlign: "left", // Align text to the left
          }}
        >
          <p className="text-[24px]">
            Welcome to Thailand’s hub for local workshops, connecting you with
            unique learning experiences. Explore hands-on sessions led by
            skilled, passionate instructors.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header2;
