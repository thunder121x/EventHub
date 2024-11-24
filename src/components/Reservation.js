import React, { useEffect, useState } from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import { useLocation } from "react-router-dom";
import AttendeeForm from "./Attendee";
import OrderSummary from "./OrderSummary";
import Footer from "./Footer";
import BackButton from "./function";
import { auth } from "../firebase"; // Firebase auth configuration
import { db } from "../firebase"; // Firebase Firestore configuration
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";


function Reservation() {
  const location = useLocation();
  const numberOfBooking = location.state?.numberOfBooking || 1;
  const selectedDate = location.state?.selectedDate || null;
  const { id } = location.state || {}; // รับ id จาก location.state
  const eventTime = location.state?.eventTime || "";
  
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


  return (
    <div>
      {/* Navbar */}
      <div className="flex justify-end items-center mx-8 py-4">
        <div className="flex items-center">
          <button className="heading3 mr-10">Balance:</button>
          <button className="heading3 ml-4">
            {userData.name} {userData.surname}
          </button>
        </div>
      </div>
      <div className="bg-background">
        <div className="flex gap-4 justify-center items-start">
          <div className="mr-2 pl-24 pt-3">
            <BackButton />
          </div>
          <div className="flex-grow">
            <div className="flex">
              <div className="w-2/3 pr-8">
                {/* Contact Information */}
                <h2 className="heading1 pb-2">Contact Information</h2>
                <p className="paragraph2 mb-4">
                  Logged in as{" "}
                  <span className="font-bold">{userData.email}</span>.{" "}
                  <a href="/Login" className="text-primary">
                    Not you?
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-4 pl-36 pr-16">
          {/* Main Content Area */}
          <div className="w-3/4">
            <AttendeeForm 
              numberOfBooking={numberOfBooking} 
              userData={userData} 
              eventFee={eventFee}
              bannerImage={bannerImage}
              eventName = {eventName}
              id={id}
              eventTime={eventTime} 
            
            selectedDate={selectedDate}/>
          </div>

          {/* Sidebar */}
          <OrderSummary 
                    eventFee={eventFee}
                    bannerImage={bannerImage}
                    event={eventName}
                    id={id}
                    numberOfBooking={numberOfBooking}
                    selectedDate={selectedDate}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Reservation;
