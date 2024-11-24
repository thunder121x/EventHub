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
  const [showDateError, setShowDateError] = useState(false);
  const [blockedDates, setBlockedDates] = useState([]); // state สำหรับเก็บวันที่ปิด
  const navigate = useNavigate();

  // Fetch event data and blocked dates from Firestore
  useEffect(() => {
    const fetchEvent = async () => {
      if (!id) return;
      const docRef = doc(db, "event", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        setEvent(data);

        // ดึง stop_date_1 ถึง stop_date_10
        const blockedDatesArray = [];
        for (let i = 1; i <= 10; i++) {
          const stopDate = data[`stop_date_${i}`];
          if (stopDate) {
            // แปลง stop_date (ค่าสตริง) เป็นวันในทุกๆ เดือน ปี
            const [day] = stopDate.split(" "); // ค่าสตริงแบบ "01", "22" จะถูกแยกเอาแค่วัน
            blockedDatesArray.push(day); // เก็บเฉพาะวันที่
          }
        }
        setBlockedDates(blockedDatesArray);
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

  const handleReserveClick = () => {
    if (!selectedDate) {
      setShowDateError(true);
      return;
    }

    setShowDateError(false);
    navigate(`/Reservation/${id}`, {
      state: {
        numberOfBooking,
        selectedDate,
        eventFee: event.eventFee || 90,
        bannerImage: event.bannerImage || "",
        event,
        eventName: event.eventNameEN,
        id,
        eventTime: formatEventTime(event.eventTimePeriod),
      }
    });
  };

  // ฟังก์ชันเช็คว่า selectedDate ตรงกับวันที่ที่ถูกปิดไว้หรือไม่
  const isBlockedDate = (date) => {
    const day = date.getDate().toString().padStart(2, "0"); // แปลงวันที่เป็นสตริงในรูปแบบ "01", "22" ฯลฯ
    return blockedDates.includes(day);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-[353px] h-fit">
      <div className="flex items-center mb-2">
        <FaCalendarAlt className="w-[17px] h-[17px] text-lightblack mr-2" />
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="MMMM d, yyyy"
          className="paragraph2 text-lightblack"
          placeholderText="Select Date"
          filterDate={(date) => !isBlockedDate(date)} // ฟิลเตอร์วันหยุด
          dayClassName={(date) =>
            isBlockedDate(date) ? "bg-gray-200 cursor-not-allowed" : "" // กำหนดคลาสให้กับวันที่ปิด
          }
        />
      </div>

      {/* แสดงข้อความแจ้งเตือนสีแดง */}
      {showDateError && (
        <p className="text-red-500 text-sm mb-4">Please select a date before reserving.</p>
      )}

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
