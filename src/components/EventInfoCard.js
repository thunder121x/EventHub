import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaMoneyBillAlt } from "react-icons/fa";
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const EventInfoCard = ({ id }) => {
  const [event, setEvent] = useState(null);
  const [numberOfBooking, setNumberOfBooking] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null); 
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

  if (!event) {
    return <p>Loading...</p>;
  }

  // คำนวณเวลา
  const formatEventTime = (eventTimePeriod) => {
    if (!eventTimePeriod) return "";
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
    const endHour = Math.floor((startTime + 90) / 60); 
    const endMinute = (startTime + 90) % 60;

    const formatTime = (h, m) => `${h}:${m.toString().padStart(2, "0")}`;
    return `${formatTime(startHour, startMinute)} - ${formatTime(endHour, endMinute)}`;
  };

  const totalAmount = numberOfBooking * (event.eventFee || 90); 
  const remainingBalance = 200.01 - totalAmount;
  const eventName = event.eventNameEN;
  // ให้ eventFee และ bannerImage มาจาก event
  const eventFee = event.eventFee || 90; // สมมติว่า eventFee มาจาก event
  const bannerImage = event.bannerImage || ""; // สมมติว่า bannerImage มาจาก event

  // ฟังก์ชันในการส่งข้อมูลไปยังหน้าจอง
  const handleReserveClick = () => {
    navigate(`/Reservation/${id}`, {
      state: { 
        numberOfBooking,
        selectedDate,
        eventFee,
        bannerImage,
        event,
        eventName,
        id,
      }
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[353px] h-fit">
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

      <div className="flex items-center mb-4">
        <FaClock className="w-[17px] h-[17px] text-lightblack mr-2" />
        <p className="paragraph2 text-lightblack">
          {event.eventTimePeriod
            ? formatEventTime(event.eventTimePeriod)
            : "No time available"}
        </p>
      </div>

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

      <div className="flex items-center mb-4">
        <FaMoneyBillAlt className="w-[17px] h-[17px] text-lightblack mr-2" />
        <p className="paragraph2 text-lightblack">
          {event.eventFee ? `${event.eventFee} ฿` : "Free"}
        </p>
      </div>

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

      {/* ปุ่ม "Reserve" */}
      <div className="mt-6">
        <button
          onClick={handleReserveClick} 
          className="bg-primary text-white py-3 w-full rounded-[30px] search"
        >
          Reserve
        </button>
      </div>
    </div>
  );
};

export default EventInfoCard;
