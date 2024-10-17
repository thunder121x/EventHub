import "../styles.css";
import React from "react";
import mockImage from "../assets/ws_mock.png";

function WorkshopRecommendationBox() {
  return (
    <div className="max-w-sm mx-auto bg-white rounded-lg shadow-lg overflow-hidden workshopRecommendation">
      <div className="relative">
        <img
          src={mockImage} // Add your workshop image URL
          alt="Workshop"
          className="w-full h-48 object-cover"
        />
        <span className="absolute top-4 right-4 bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full">
          Available
        </span>
      </div>
      <div className="p-4">
        <p className="text-sm text-purple-700 font-semibold">
          Bang Rak, Bangkok
        </p>
        <h3 className="text-xl font-bold text-gray-800">
          Authentic Thai Cooking and Culinary Techniques
        </h3>
      </div>
    </div>
  );
}

export default WorkshopRecommendationBox;
