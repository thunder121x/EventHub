import React from "react";
import { useLocation, Navigate } from "react-router-dom";
import headerImage from "../assets/header.png";
import searchIcon from "../assets/emoji/searchIcon.png";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";

function FilterPageWithState() {
  const location = useLocation();
  const { workshopType, province, startDate, endDate } = location.state || {};

  // Redirect back to the main search page if any of the required state data is missing
  if (!workshopType || !province || !startDate || !endDate) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <header
        className="bg-primary text-white text-center py-10"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "360px",
          display: "flex", // Enable Flexbox
          flexDirection: "column", // Stack items vertically
          justifyContent: "center", // Center vertically
          alignItems: "center", // Center horizontally
        }}
      >
        <div>
          <FilterPage
            workshopType={workshopType}
            province={province}
            startDate={new Date(startDate)}
            endDate={new Date(endDate)}
          />
        </div>
      </header>

      <div className="px-20 py-10">
        {/* <div className="border-l-2 border-primary h-10 mx-2 rounded-l-md"></div>
      <span className="text-heading-2 font-poppins">Workshop</span> */}
        <div className="flex-col">
          <div className="flex justify-start">
            <h1 className="display2 text-primary">9 Workshops Founds</h1>
          </div>
          <div className="bg-gray opacity-20 w-full h-0.5 my-4 mr-2"></div>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-8">
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
          <WorkshopRecommendationBox />
        </div>
      </div>
    </div>
  );
}

function FilterPage({ workshopType, province, startDate, endDate }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 text-black">
      <div className="flex items-center bg-white py-1 px-4 rounded-[21px] shadow-lg max-w">
        {/* Province */}
        <div className="flex items-center px-4">
          <span className="heading4">{province}</span>
        </div>

        {/* Divider */}
        <div className="border-l-2 h-8 mx-4" />

        {/* Date Range */}
        <div className="flex items-center px-4">
          <span className="heading4">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </span>
        </div>

        {/* Divider */}
        <div className="border-l-2 h-8 mx-4" />

        {/* Workshop Type */}
        <div className="flex items-center px-4">
          <span className="heading4">{workshopType}</span>
        </div>

        {/* Search Icon */}
        <div className="ml-4">
          <button className="bg-purple-500 p-2 rounded-full">
            <img
              src={searchIcon}
              alt="SearchIcon"
              className="w-6 h-6 text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPageWithState;
