import React, { useEffect, useState } from "react";
import { db } from "../firebase"; // Firebase configuration
import { collection, query, where, getDocs, onSnapshot } from "firebase/firestore";
import { auth } from "../firebase";
import logo from "../assets/eventhub_logo.png";
import LeftNav from "./LeftNav";

const BookingHistory = () => {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTickets = async (userId) => {
    try {
      const ticketsRef = collection(db, "tickets");
      const q = query(ticketsRef, where("user_id", "==", userId));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No booking history found for this user.");
        setTickets([]);
      } else {
        const ticketData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTickets(ticketData);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching tickets:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    // ตรวจสอบว่ามีผู้ใช้ที่ล็อกอินอยู่หรือไม่
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(`Logged in as: ${user.uid}`);
        fetchTickets(user.uid);
      } else {
        console.log("No user is logged in.");
        setTickets([]);
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener
  }, []);

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  if (loading) {
    return <p className="text-center mt-10 text-gray-500">Loading booking history...</p>;
  }

  if (tickets.length === 0) {
    return (
      <div className="min-h-screen bg-whitex font-sans">
        <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
          <div className="flex items-center">
            <img src={logo} alt="EventHub logo" className="mr-2 w-10 h-10" />
            <button className="navtext font-bold">EventHub</button>
          </div>
        </div>

        <div className="flex">
          <LeftNav />
          <main className="w-3/4 p-8 mt-10">
            <h1 className="text-primary heading2 mb-6">Booking History</h1>
            <div className="border-b border-lightgray mb-8"></div>
            <p className="text-gray-500">You have no past bookings.</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-whitex font-sans">
      <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
        <div className="flex items-center">
          <img src={logo} alt="EventHub logo" className="mr-2 w-10 h-10" />
          <button className="navtext font-bold">EventHub</button>
        </div>
      </div>

      <div className="flex">
        <LeftNav />

        <main className="w-3/4 p-8 mt-10">
          <h1 className="text-primary heading2 mb-6">Booking History</h1>
          <div className="border-b border-lightgray mb-8"></div>

          <div className="space-y-10">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="bg-white p-6 rounded-lg shadow-sm border border-transparent flex-wrap">
                <div className="flex items-center gap-8">
                  <img
                    src={ticket.bannerImage || "/api/placeholder/96/96"}
                    alt={ticket.eventName}
                    className="w-24 h-24 rounded-full object-cover border"
                  />
                  <div className="flex-grow">
                    <div className="grid grid-cols-3 items-center">
                      <div>
                        <p className="text-primary mb-1">Workshop:</p>
                        <p className="text-gray">{ticket.eventName}</p>
                      </div>
                      <div>
                        <p className="text-primary mb-1">Date & Time:</p>
                        <p className="text-gray">{formatDateTime(ticket.start_date)}</p>
                      </div>
                      <div className="justify-self-end">
                        <span
                          className={`px-6 py-4 rounded-full ${
                            new Date(ticket.start_date) > new Date() ? "bg-primary" : "bg-gray"
                          } text-white`}
                        >
                          {new Date(ticket.start_date) > new Date() ? "Upcoming" : "Previous"}
                        </span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-gray">
                        <strong>Quantity: </strong>
                        {ticket.quantity}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingHistory;
