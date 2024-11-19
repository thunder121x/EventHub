import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import ThaiCooking from "../assets/thaicook.png";
import Muay from "../assets/muay.svg";
import LeftNav from "./LeftNav";

const BookingHistory = () => {
  return (
    <div className="min-h-screen bg-whitex font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
        <div className="flex items-center">
          <img src={logo} alt="EventHub logo" className="mr-2 w-10 h-10" />
          <button className="navtext font-bold">EventHub</button>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="navtext">
            Search Bar
          </a>
          <a href="#" className="navtext">
            Explore Workshops
          </a>
          <a href="#" className="navtext">
            About Us
          </a>
          <div className="w-8 h-8 rounded-full bg-whitex overflow-hidden">
            <img
              src="/api/placeholder/32/32"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </nav>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <LeftNav/>

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <h1 className="text-primary heading2 mb-6">Booking History</h1>
          <div className="border-b border-lightgray mb-8"></div>

          <div className="space-y-10">
            {/* Upcoming Workshop Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-transparent flex-wrap ">
              <div className="flex items-center gap-8 ">
                <img
                  src={ThaiCooking}                  alt="Thai Cooking"
                  className="w-24 h-24 rounded-full object-cover  border"
                />
                <div className="flex-grow">
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <p className="text-primary mb-1">Workshop:</p>
                      <p className="text-gray">Authentic Thai Cooking</p>
                    </div>
                    <div>
                      <p className="text-primary mb-1">Date & Time:</p>
                      <p className="text-gray">11 December 2024, 2PM</p>
                    </div>
                    <div className="justify-self-end">
                      <span className="px-6 py-4 bg-primary text-white rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Workshop Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border  border-transparent flex-wrap">
              <div className="flex items-center gap-8 ">
                <img
                  src={Muay}
                  alt="Muay Thai"
                  className="w-24 h-24 rounded-full object-cover border"
                />
                <div className="flex-grow">
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <p className="text-primary mb-1">Workshop:</p>
                      <p className="text-gray">Traditional Muay Thai</p>
                    </div>
                    <div>
                      <p className="text-primary mb-1">Date & Time:</p>
                      <p className="text-gray">25 October 2024, 1PM</p>
                    </div>
                    <div className="justify-self-end">
                      <span className="px-6 py-4 bg-gray text-white rounded-full">
                        Previous
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingHistory;
