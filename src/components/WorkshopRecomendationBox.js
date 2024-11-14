import "../styles.css";
import React from "react";
import mockImage from "../assets/ws_mock.png";
import { HashLink } from "react-router-hash-link";

function WorkshopRecommendationBox() {
  return (
    <HashLink smooth to="/EventDetail">
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden workshopRecommendation mx-5 my-5">
        <div className="relative">
          <img
            src={mockImage} // Add your workshop image URL
            alt="Workshop"
            className="w-full h-52 object-cover"
          />
          <span className="absolute top-4 right-4 bg-secondary px-3 py-1 rounded-full heading5">
            Available
          </span>
        </div>
        <div className="p-4">
          <p className="text-primary heading4 text-start">Bang Rak, Bangkok</p>
          <h3 className="heading3 text-start">
            Authentic Thai Cooking and Culinary Techniques
          </h3>
        </div>
      </div>
    </HashLink>
  );
}

export default WorkshopRecommendationBox;
