import React from "react";
import "../styles.css";
import food from "../assets/Food.png";
import logo from "../assets/eventhub_logo.png";
import { useLocation } from "react-router-dom";
import AttendeeForm from "./Attendee";

// import "../styles/EventDetail.css";
import EventInfoCard from "./EventInfoCard";
import StarRating from "./StarRating";
// import instructorImage from "../assets/instructor.png"; // replace with actual instructor image
import classImage from "../assets/classImage.png"; // replace with actual class image
import arrowBack from "../assets/arrow_back.svg"; // replace with actual class image
import like from "../assets/heart.png"; // replace with actual class image
import share from "../assets/share.png"; // replace with actual class image
import Profile from "../assets/Profile.jpg";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";
import Footer from "./Footer";
import BackButton from "./function";
import OrderSummary from "./OrderSummary";

// Main Reservation component
function Reservation() {
  const location = useLocation();
  const numberOfBooking = location.state?.numberOfBooking || 1;
  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center mx-8 py-4">
        <div className="flex items-center">
          <img src={logo} alt="EventHub logo" className="mr-4 w-10 h-10" />
          <button className="navtext text-primary">EventHub</button>
        </div>
        <div className="flex items-center">
          <button className="heading3 mr-10">Balanced:</button>
          <button className="heading3 ml-4">John Doe</button>
        </div>
      </div>
      <div className="bg-background">
        <div className="flex gap-4 justify-center items-start">
          <div className=" mr-2 pl-24 pt-3">
            <BackButton />
          </div>
          <div className="flex-grow">
            <div className="flex">
              <div className="w-2/3 pr-8">
                {/* Contact Information */}
                <h2 className="heading1 pb-2">Contact information</h2>
                <p className="paragraph2 mb-4">
                  Logged in as{" "}
                  <span className=" font-bold">JohnDoe@gmail.com</span>.{" "}
                  <a href="/Login" className=" text-primary">
                    Not you?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 pl-36 pr-16">
          {/* Main Content Area */}
          <div className=" w-3/4">
            <AttendeeForm numberOfBooking={numberOfBooking} />
          </div>

          {/* Sidebar */}
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

export default Reservation;
