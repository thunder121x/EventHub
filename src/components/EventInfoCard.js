import React, { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker"; // Import DatePicker
import "react-datepicker/dist/react-datepicker.css"; // Import CSS for DatePicker

const EventInfoCard = ({ id }) => {
  const [event, setEvent] = useState(null);
  const [numberOfBooking, setNumberOfBooking] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null); // To store the selected date
  const navigate = useNavigate();

  // Fetch data from Firestore using the id
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const docRef = doc(db, "event", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setEvent(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchEvent();
  }, [id]);

  // Loading message
  if (!event) {
    return <p>Loading...</p>;
  }

  // ฟังก์ชันจัดการเวลา
  const formatEventTime = (eventTimePeriod) => {
    if (!eventTimePeriod) return "";

    // กำหนดเวลาที่จะเริ่ม
    let startTime;
    if (eventTimePeriod < 30) {
      startTime = 540; // 9:00 AM
    } else if (eventTimePeriod >= 30 && eventTimePeriod <= 89) {
      startTime = 600; // 10:00 AM
    } else {
      startTime = 780; // 1:00 PM
    }

    const startHour = Math.floor(startTime / 60);
    const startMinute = startTime % 60;

    const endHour = Math.floor((startTime + 90) / 60); // เพิ่ม 90 นาที
    const endMinute = (startTime + 90) % 60;

    const formatTime = (h, m) => `${h}:${m.toString().padStart(2, "0")}`;
    return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[353px] h-fit">
      {/* Date Picker */}
      <div className="flex items-center mb-4">
        <FaCalendarAlt className="w-[17px] h-[17px] text-lightblack mr-2" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="paragraph2 text-lightblack"
          placeholderText="Select Date"
        />
      </div>

      {/* Time */}
      <div className="flex items-center mb-4">
        <FaClock className="w-[17px] h-[17px] text-lightblack mr-2" />
        <p className="paragraph2 text-lightblack">
          {event.eventTimePeriod
            ? formatEventTime(event.eventTimePeriod)
            : "No time available"}
        </p>
      </div>

      {/* Location */}
      <div className="flex items-center mb-2 gap-2">
        <FaMapMarkerAlt className="w-[17px] h-[17px] text-lightblack flex-shrink-0" />
        <p className="paragraph2 text-lightblack leading-tight">
          {[
            event.villageNameEN,
            event.tamNameEN,
            event.ampNameEN,
            event.provNameEN,
          ]
            .filter(Boolean)
            .join(", ") || "No location available"}
        </p>
      </div>

      {/* Fee */}
      <div className="flex items-center mb-4">
        <FaMoneyBillAlt className="w-[17px] h-[17px] text-lightblack mr-2" />
        <p className="paragraph2 text-lightblack">
          {event.eventFee ? `${event.eventFee} ฿` : "Free"}
        </p>
      </div>

      {/* Booking Controls */}
      <div className="flex items-center justify-between mt-6 mb-4 pl-6">
        <button
          className="rounded-full border-lightgray border heading3 text-lightgray w-10 h-10 flex items-center justify-center"
          onClick={() => setNumberOfBooking((prev) => Math.max(prev - 1, 1))}
        >
          -
        </button>
        <span className="heading2 text-lightblack">{numberOfBooking}</span>
        <button
          className="rounded-full border-lightgray border heading3 text-lightgray w-10 h-10 flex items-center justify-center"
          onClick={() => setNumberOfBooking((prev) => prev + 1)}
        >
          +
        </button>
      </div>

      {/* Reserve Button */}
      <button
        className="bg-primary text-white py-3 w-full rounded-[30px] search"
        onClick={() =>
          navigate("/Reservation", {
            state: { numberOfBooking, selectedDate },
          })
        }
      >
        Reserve
      </button>
    </div>
  );
};

export default EventInfoCard;
