import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase"; // Firebase auth configuration
import { useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const OrderSummary = ({  }) => {
  const location = useLocation();
  const numberOfBooking = location.state?.numberOfBooking || 1;
  const selectedDate = location.state?.selectedDate || null;
  const { id } = location.state || {}; // รับ id จาก location.state
  
  // State for event data
  const [eventData, setEventData] = useState({});
  const [loadingEvent, setLoadingEvent] = useState(true); // State สำหรับการโหลดข้อมูล Event
  const [userData, setUserData] = useState({
    email: "",
    name: "",
    surname: "",
    phoneNum: "" ,
    pocket_money: "",
  });
  const [loading, setLoading] = useState(true); // Loading state for user data

  // ดึงข้อมูล Event จาก Firestore
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "event", id)); // ดึงข้อมูล Event ด้วย id
        if (eventDoc.exists()) {
          setEventData(eventDoc.data()); // เก็บข้อมูล Event
        } else {
          console.error("No such event document!");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoadingEvent(false); // หยุดโหลดเมื่อข้อมูลถูกดึงเสร็จ
      }
    };

    fetchEventData();
  }, [id]); // เมื่อมีการเปลี่ยนแปลง id จะทำการดึงข้อมูลใหม่

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data()); // Set the user data from Firestore
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false); // Stop loading once data is fetched
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid); // Fetch data for the logged-in user
      } else {
        console.error("No user is logged in!");
        setLoading(false);
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  if (loading || loadingEvent) {
    return <p className="text-center text-gray-500 mt-10">Loading...</p>;
  }

  const { eventFee = "", bannerImage = "", eventName = "", location: eventLocation } = eventData;
  const totalAmount = eventFee * numberOfBooking; // คำนวณราคาจาก eventFee และ numberOfBooking
  const remainingBalance = userData.pocket_money - totalAmount; 
  return (
    <div className="w-1/3 pl-8 mt-20">
      <div className="bg-white rounded-lg shadow-md">
        <img
          src={bannerImage}
          alt="Event"
          className="rounded-lg"
        />
        <div className="p-4">
          <h3 className="text-lg font-bold mb-2">Order summary</h3>
          <p className="flex text-[13px] mb-2 border-b pb-3">
            {selectedDate ? selectedDate.toLocaleDateString() : "Date not selected"}
          </p>
          <div className="flex justify-between text-[13px] mb-2">
            <span>Delivery</span>
          </div>
          <div className="flex justify-between text-[13px] mb-2 border-b pb-3">
            <span>{numberOfBooking} x eTicket</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold mb-2">
            <span>Total</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-[13px] text-gray mb-2">
            <span>Remaining Balance</span>
            <span>${remainingBalance.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
