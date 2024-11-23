import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase"; // Firebase Firestore configuration
import { doc, getDoc } from "firebase/firestore";
import { auth } from "../firebase"; // Firebase auth configuration
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";

const AttendeeForm = ({ numberOfBooking }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || null;
  const { id } = location.state || {}; // รับ id จาก location.state

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    surname: "",
    phoneNum: "",
    pocket_money: "",
  });
  const [eventData, setEventData] = useState({}); // กำหนด state สำหรับข้อมูล event
  const [loading, setLoading] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(true); // กำหนด state สำหรับสถานะการโหลดข้อมูล event

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "event", id));
        if (eventDoc.exists()) {
          setEventData(eventDoc.data()); // บันทึกข้อมูล event
        } else {
          console.error("No such event document!");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoadingEvent(false); // การโหลดข้อมูล event เสร็จสิ้น
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  useEffect(() => {
    const fetchUserData = async (userId) => {
      try {
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          setUserData(userDoc.data());
        } else {
          console.error("No such user document!");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchUserData(user.uid);
      } else {
        console.error("No user is logged in!");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const attendeeTitles = numberOfBooking > 0
    ? ["Primary Contact", ...Array(numberOfBooking - 1).fill(null).map((_, i) => `Attendee ${i + 2}`)]
    : [];


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      try {
        // เพิ่มข้อมูลไปยัง Firestore collection "tickets"
        const ticketRef = await addDoc(collection(db, "tickets"), {
          quantity: numberOfBooking, // จำนวนการจอง
          user_id: auth.currentUser?.uid || "anonymous", // ไอดีผู้ใช้
          start_date: selectedDate, // วันที่เริ่ม
          end_date: selectedDate, // วันที่สิ้นสุด
          eventName: eventData.eventNameEN || "", 
          bannerImage: eventData.bannerImage,
        });
    
        // ใช้ ticketRef.id เพื่อดึง `id` ของเอกสาร
        const ticketId = ticketRef.id;
    
        // ส่งต่อไปยังหน้า Confirmation พร้อม `ticketId` และข้อมูลอื่นๆ
        navigate(`/ReservationConfirmation#top`, {
          state: {
            ticketId: ticketId, // ส่งต่อ ID ของ tickets
            numberOfBooking: numberOfBooking,
            userData: userData,
            selectedDate: JSON.stringify(selectedDate), // แปลง selectedDate เป็นสตริง
            eventName: eventData.eventName,
            bannerImage: eventData.bannerImage,
          },
        });
      } catch (error) {
        console.error("Error adding ticket document: ", error);
      }
    };
    

  if (loading || loadingEvent) {
    return <p className="text-center text-gray-500 mt-10">Loading data...</p>;
  }

  const { eventFee = "", bannerImage = "", eventName = "", location: eventLocation = "" } = eventData;

  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto">
        {attendeeTitles.map((title, index) => (
          <div key={index} className="mb-8">
            <h3 className="heading2 mb-4 pb-2">{title}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block heading3 mb-1 pb-2">First Name</label>
                <input
                  type="text"
                  className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                  placeholder="John"
                  value={userData.name}
                  readOnly
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                  placeholder="Doe"
                  value={userData.surname}
                  readOnly
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Email</label>
              <input
                type="email"
                className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                placeholder="JohnDoe@gmail.com"
                value={userData.email}
                readOnly
              />
            </div>

            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Phone Number</label>
              <input
                type="text"
                className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                placeholder="+66 (555) 000-0000"
                value={userData.phoneNum}
                readOnly
              />
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col mb-4 pb-2">
        <label className="flex items-center mb-2">
          <input type="checkbox" className="mr-2" />
          Keep me updated on more events and news from this event organizer
        </label>
        <label className="flex items-center">
          <input type="checkbox" className="mr-2" />
          Send me emails about the best events happening nearby or online.
        </label>
      </div>

      <button type="submit" className="text-[20px] bg-primary text-white py-2 px-20 rounded-full w-100 font-bold">
        Submit
      </button>
      <p className="text-[13px] mt-4">
        Powered by <span className="font-bold">EventHub</span>
      </p>
    </form>
  );
};

export default AttendeeForm;
