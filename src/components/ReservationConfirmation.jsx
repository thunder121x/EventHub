import React, { useEffect, useState } from "react";
import "../styles.css";
import Approved from "../assets/Approved.png";
import logo from "../assets/eventhub_logo.png";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase"; // Firestore configuration
import { useLocation } from "react-router-dom";

const ReservationConfirmation = () => {
  const location = useLocation();
  const ticketId = location.state?.ticketId || null; // รับ ticketId จากหน้าก่อน
  const [ticketData, setTicketData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTicketData = async () => {
      if (!ticketId) return;
      try {
        const ticketDoc = await getDoc(doc(db, "tickets", ticketId));
        if (ticketDoc.exists()) {
          const ticket = ticketDoc.data();
          setTicketData(ticket);

          // ดึงข้อมูลผู้ใช้จาก user_id
          if (ticket.user_id) {
            const userDoc = await getDoc(doc(db, "users", ticket.user_id));
            if (userDoc.exists()) {
              setUserData(userDoc.data());
            } else {
              console.error("No user data found for this ticket!");
            }
          }
        } else {
          console.error("No ticket found with the provided ID!");
        }
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTicketData();
  }, [ticketId]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  if (!ticketData || !userData) {
    return <p className="text-center text-gray-500 mt-10">No data available.</p>;
  }

  const { eventName = "Unknown Event", start_date, quantity = 0 } = ticketData;
  const { name = "Unknown", surname = "User" } = userData;

  const formatDateTime = (timestamp) => {
    if (!timestamp) return "Date not available";
    
    // ตรวจสอบว่า timestamp เป็นสตริงหรือไม่
    if (typeof timestamp === "string") {
      return timestamp;  // ถ้าเป็นสตริงก็ให้คืนค่ากลับไปเลย
    }
    
    const date = new Date(timestamp);  // หากไม่ใช่สตริง ให้แปลงเป็น Date object
    
    // หาก timestamp เป็นวันที่ที่ไม่ถูกต้อง
    if (isNaN(date)) return "Invalid Date"; 
  
    const options = {
      hour: '2-digit', 
      minute: '2-digit', 
      hour12: true, // ใช้ AM/PM
    };
  
    const formattedTime = date.toLocaleTimeString([], options); // แสดงเวลาในรูปแบบ AM/PM
    
    const formattedDate = date.toLocaleDateString('en-GB', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  
    return `${formattedTime} ${formattedDate}`; // ไม่มีลูกน้ำ
  };
  
  
  

  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-between items-center mx-8 py-4">
        <div className="flex items-center">
          {/* เพิ่มการคลิกโลโก้เพื่อกลับไปโฮมเพจ */}
          <img
            src={logo}
            alt="EventHub logo"
            className="mr-4 w-10 h-10 cursor-pointer"
            onClick={() => (window.location.href = "/#top")}
          />
          <button className="navtext text-primary">EventHub</button>
        </div>
        <div className="flex items-center">
          <button className="heading3 mr-10">Balance:</button>
          <button className="heading3 ml-4">{`${name} ${surname}`}</button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
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
          We have sent your booking to the workshop provider.
        </div>

        {/* Reservation Details */}
        <div className="w-full max-w flex pt-5">
          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Workshop:</p>
            <p className="text-text">{eventName}</p>
          </div>

          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Date & Time:</p>
            <p className="text-text">{formatDateTime(start_date)}</p>
          </div>

          <div className="flex-1 text-center pr-3 border-r border-gray">
            <p className="text-primary font-medium mb-2">Customer:</p>
            <p className="text-text">{`${name} ${surname}`}</p>
          </div>

          <div className="flex-1 text-center">
            <p className="text-primary font-medium mb-2">Quantity:</p>
            <p className="text-text">{quantity} Ticket{quantity > 1 ? "s" : ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
