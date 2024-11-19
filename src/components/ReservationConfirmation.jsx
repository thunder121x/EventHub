import React from "react";
import "../styles.css";
import Approved from "../assets/Approved.png";
import logo from "../assets/eventhub_logo.png";

const ReservationConfirmation = () => {
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

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen  p-4">
        {/* Custom Success Checkmark */}
        <div className="mb-6">
          <div className="rounded-full p-3">
            <img src={Approved} alt="Success" className="w-full h-full" />
          </div>
        </div>

        {/* Confirmation Header */}
        <h1 className="text-2xl mb-4 pb-6">
          Your Reservation Is Successfully Booked!
        </h1>

        {/* Booking Message */}
        <div className="text-text mb-8">
          We have sent your booking to the workshop provider.{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700 pb-5">
          </a>
        </div>

        {/* Reservation Details */}
        <div className="w-full max-w flex pt-5">
          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Workshop:</p>
            <p className="text-text">Authentic Thai Cooking</p>
          </div>

          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Date & Time:</p>
            <p className="text-text">
              {new Date().toLocaleDateString()} -{" "}
              {new Date().toLocaleTimeString()}
            </p>
          </div>

          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Customer:</p>
            <p className="text-text">John Doe</p>
          </div>

          <div className="flex-1 text-center">
            <p className="text-primary font-medium mb-2">Quantity:</p>
            <p className="text-text">1 Ticket</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
