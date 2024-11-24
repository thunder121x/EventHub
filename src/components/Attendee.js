import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase"; // Firebase Firestore และ Auth configuration
import { doc, getDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";

const AttendeeForm = ({ numberOfBooking }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const selectedDate = location.state?.selectedDate || null;
  const { id } = location.state || {}; // รับ id จาก location.state
  const eventTime = location.state?.eventTime || "";

  const [userData, setUserData] = useState({
    email: "",
    name: "",
    surname: "",
    phoneNum: "",
    pocket_money: "",
  });
  const [eventData, setEventData] = useState({});
  const [loading, setLoading] = useState(true);
  const [loadingEvent, setLoadingEvent] = useState(true);

  // Fetch Event Data
  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const eventDoc = await getDoc(doc(db, "event", id));
        if (eventDoc.exists()) {
          setEventData(eventDoc.data());
        } else {
          console.error("No such event document!");
        }
      } catch (error) {
        console.error("Error fetching event data:", error);
      } finally {
        setLoadingEvent(false);
      }
    };

    if (id) {
      fetchEventData();
    }
  }, [id]);

  // Fetch User Data
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

  // Calculate Total Amount and Remaining Balance
  const { eventFee = "", bannerImage = "", eventName = "", location: eventLocation } = eventData;
  const totalAmount = eventFee * numberOfBooking;
  const remainingBalance = userData.pocket_money - totalAmount;

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check if pocket money is sufficient
    if (remainingBalance < 0) {
      alert("Insufficient balance! You need ฿" + Math.abs(remainingBalance) + " more to complete the reservation.");
      return;
    }
  
    try {
      // Format the start_date to include time and date
      const formattedDate = selectedDate.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }); // e.g., "25 November 2024"
      const formattedStartDate = `${eventTime} ${formattedDate}`; // Combine time and date
  
      // Add ticket to the tickets collection
      const ticketRef = await addDoc(collection(db, "tickets"), {
        quantity: numberOfBooking,
        user_id: auth.currentUser?.uid || "anonymous",
        start_date: formattedStartDate, // Include time in the start_date
        end_date: selectedDate, // Keep the original date as end_date
        eventName: eventData.eventNameEN || "",
        bannerImage: eventData.bannerImage,
      });
  
      const ticketId = ticketRef.id;
  
      // Update pocket_money in users collection
      const userDocRef = doc(db, "users", auth.currentUser?.uid);
      await updateDoc(userDocRef, {
        pocket_money: remainingBalance,
      });
  
      // Navigate to the confirmation page
      navigate(`/ReservationConfirmation#top`, {
        state: {
          ticketId: ticketId,
          numberOfBooking: numberOfBooking,
          userData: userData,
          selectedDate: JSON.stringify(selectedDate),
          eventName: eventData.eventName,
          bannerImage: eventData.bannerImage,
          eventTime: eventTime, // Pass eventTime to confirmation
        },
      });
    } catch (error) {
      console.error("Error adding ticket document or updating pocket money: ", error);
    }
  };
  

  // Loading State
  if (loading || loadingEvent) {
    return <p className="text-center text-gray-500 mt-10">Loading data...</p>;
  }

  const attendeeTitles =
    numberOfBooking > 0
      ? ["Primary Contact", ...Array(numberOfBooking - 1).fill(null).map((_, i) => `Attendee ${i + 2}`)]
      : [];

  // Form UI
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
                  defaultValue={index === 0 ? userData.name : ""}
                  readOnly={index === 0}
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                  placeholder="Doe"
                  defaultValue={index === 0 ? userData.surname : ""}
                  readOnly={index === 0}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Email</label>
              <input
                type="email"
                className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                placeholder="JohnDoe@gmail.com"
                defaultValue={index === 0 ? userData.email : ""}
                readOnly={index === 0}
              />
            </div>

            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Phone Number</label>
              <input
                type="text"
                className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                placeholder="+66 (555) 000-0000"
                defaultValue={index === 0 ? userData.phoneNum : ""}
                readOnly={index === 0}
              />
            </div>
          </div>
        ))}
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
