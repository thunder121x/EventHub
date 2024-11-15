import {React, useState} from "react";
import calendarIcon from "../assets/calendar.png"; // replace with actual icon path
import clockIcon from "../assets/clock.png";
import locationIcon from "../assets/location.png";
import avatar from "../assets/avatar.png";
// import "../styles/EventDetail.css";
import { useNavigate } from "react-router-dom";

const EventInfoCard = () => {
  const [numberOfBooking, setNumberOfBooking] = useState(1); // Initial value set to 1
  const navigate = useNavigate();

  const handleIncrement = () => {
    setNumberOfBooking((prevCount) => prevCount + 1);
  };

  const handleDecrement = () => {
    if (numberOfBooking > 1) {
      // Ensure it doesn't go below 1
      setNumberOfBooking((prevCount) => prevCount - 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/Reservation`, {
      state: {
        numberOfBooking: numberOfBooking,
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[353px] h-fit">
      <div className="flex items-center mb-4">
        <img
          src={calendarIcon}
          alt="Calendar"
          className="w-[17px] h-[17px] mr-2"
        />
        <p className="paragraph2 text-lightblack">23/12/2024</p>
      </div>
      <div className="flex items-center mb-4">
        <img src={clockIcon} alt="Clock" className="w-[17px] h-[17px] mr-2" />
        <p className="paragraph2 text-lightblack">10:00 - 14:00 pm</p>
      </div>
      <div className="flex items-start mb-4">
        <img
          src={locationIcon}
          alt="Location"
          className="w-[17px] h-[17px] mr-2"
        />
        <p className="paragraph2 text-lightblack">
          126 Pracha Uthit Rd, Khwaeng Bang Mot, Khet Thung Khru, Krung Thep
          Maha Nakhon 10140
        </p>
      </div>
      <div className="flex items-center justify-between mt-6 mb-4 pl-6">
        <button
          className="rounded-full border-lightgray border heading3 text-lightgray w-10 h-10 flex items-center justify-center"
          onClick={handleDecrement}
        >
          -
        </button>
        <span className="heading2 text-lightblack">{numberOfBooking}</span>
        <button
          className="rounded-full border-lightgray border heading3 text-lightgray w-10 h-10 flex items-center justify-center"
          onClick={handleIncrement}
        >
          +
        </button>
      </div>
      <div className="flex">
        <img src={avatar} alt="Avatar" className="w-[17px] h-[17px] mr-2" />
        <p className="text-sm text-lightgray mb-6">12/40 participants</p>
      </div>
      <button
        className="bg-primary text-white py-3 w-full rounded-[30px] search"
        onClick={handleSubmit}
      >
        Reserve
      </button>
    </div>
  );
};

export default EventInfoCard;
