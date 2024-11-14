import React from "react";
// import "../styles/EventDetail.css";
import EventInfoCard from "./EventInfoCard";
import StarRating from "./StarRating";
// import instructorImage from "../assets/instructor.png"; // replace with actual instructor image
import classImage from "../assets/classImage.png"; // replace with actual class image
import arrowBack from "../assets/arrow_back.png"; // replace with actual class image

const EventDetail = () => {
  return (
    <div className="event-detail-page bg-background text-text min-h-screen pt-36">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* Main Content Area */}
        <div className="">
          {/* Breadcrumb */}
          <p className="text-primary text-lg mb-2">
            <img
              src={arrowBack}
              alt="arrowBack"
              className="w-[17px] h-[17px] mr-2"
            />
            Cooking / Authentic Thai Cooking and Culinary Techniques
          </p>

          {/* Event Title */}
          <h1 className="heading1 text-text mb-2">
            Authentic Thai Cooking and Culinary Techniques
          </h1>

          {/* Star Rating */}
          <div className="flex items-center mb-4">
            <StarRating rating={4.5} />
            <span className="ml-2">(37)</span>
          </div>

          {/* Class Image */}
          <img
            src={classImage}
            alt="Class"
            className="rounded-lg mb-4 w-full h-auto"
          />

          {/* Class Details */}
          <h2 className="heading2 mb-2">Class details:</h2>
          <p className="text-sm text-gray mb-2">
            updated on 10/12/2024 เวลา 16:00 pm
          </p>
          <p className="paragraph1 mb-4">
            Discover the vibrant flavors of Thailand in our immersive Authentic
            Thai Cooking and Culinary Techniques workshop, focusing on the art
            of making Som Tam (Green Papaya Salad)...
          </p>
          <p className="paragraph1">
            Under the guidance of an experienced Thai chef, you’ll learn the
            step-by-step process...
          </p>
        </div>

        {/* Sidebar */}
        <EventInfoCard />
      </div>
    </div>
  );
};

export default EventDetail;
