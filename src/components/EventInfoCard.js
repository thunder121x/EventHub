import React from "react";
import calendarIcon from "../assets/calendar.png"; // replace with actual icon path
import clockIcon from "../assets/clock.png";
import locationIcon from "../assets/location.png";
// import "../styles/EventDetail.css";

const EventInfoCard = () => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full lg:w-80">
      <div className="flex items-center mb-4">
        <img
          src={calendarIcon}
          alt="Calendar"
          className="w-[17px] h-[17px] mr-2"
        />
        <p className="text-lg">23/12/2024</p>
      </div>
      <div className="flex items-center mb-4">
        <img src={clockIcon} alt="Clock" className="w-[17px] h-[17px] mr-2" />
        <p className="text-lg">10:00 - 14:00 pm</p>
      </div>
      <div className="flex items-start mb-4">
        <img src={locationIcon} alt="Location" className="w-[17px] h-[17px] mr-2" />
        <p className="text-lg">
          126 Pracha Uthit Rd, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep
          Maha Nakhon 10140
        </p>
      </div>
      <div className="flex items-center justify-between mt-6 mb-4">
        <button className="rounded-full bg-primary text-white text-lg w-10 h-10 flex items-center justify-center">
          -
        </button>
        <span className="text-lg">1</span>
        <button className="rounded-full bg-primary text-white text-lg w-10 h-10 flex items-center justify-center">
          +
        </button>
      </div>
      <p className="text-sm text-gray mb-6">12/40 participants</p>
      <button className="bg-primary text-white py-3 w-full rounded-[30px]">
        Reserve
      </button>
    </div>
  );
};

export default EventInfoCard;
