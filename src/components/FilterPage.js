import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import EventBox from "./EventBox";
import headerImage from "../assets/header.png";

function FilterPageWithState() {
  const location = useLocation();
  const { eventType = "All Events", province } = location.state || {};  // ตรวจสอบว่าได้รับค่าหรือไม่

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let q = collection(db, "event");

        // สร้างเงื่อนไขการกรอง
        const queries = [];
        if (eventType !== "All Events") {
          queries.push(where("eventTypeEN", "==", eventType));  // กรองตาม eventType
        }
        if (province) {
          queries.push(where("provNameEN", "==", province));  // กรองตาม province
        }

        // ใช้ query หากมีเงื่อนไข
        if (queries.length > 0) {
          q = query(q, ...queries);
        }

        const querySnapshot = await getDocs(q);
        const fetchedEvents = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.bannerImage && data.eventNameEN && data.ampNameEN && data.provNameEN) {
            fetchedEvents.push({
              id: doc.id,
              bannerImage: data.bannerImage,
              eventNameEN: data.eventNameEN,
              ampNameEN: data.ampNameEN,
              provNameEN: data.provNameEN,
            });
          }
        });

        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [eventType, province]);  // ดึงข้อมูลใหม่เมื่อ eventType หรือ province เปลี่ยนแปลง

  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  return (
    <div>
      {/* Header Section */}
      <header
        className="bg-primary text-white text-center py-10"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "360px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="flex flex-col items-center">
          <h1 className="display2 text-primary">Events Found</h1>
          <div className="bg-gray opacity-20 w-full h-0.5 my-4"></div>
          <div className="flex items-center">
            {province && <span className="heading4 px-4">{province}</span>}
            {eventType !== "All Events" && (
              <>
                <span className="heading4 px-4">|</span>
                <span className="heading4 px-4">{eventType}</span>
              </>
            )}
            {eventType === "All Events" && (
              <>
                <span className="heading4 px-4">|</span>
                <span className="heading4 px-4">All Events</span>
              </>
            )}
          </div>
          <div className="bg-gray opacity-20 w-full h-0.5 my-4"></div>
          <div className="flex items-center">
            <span className="heading4 px-4">Search Date: {getCurrentDate()}</span>
          </div>
        </div>
      </header>

      {/* Event Count Section */}
      <div className="px-20 py-10">
        <div className="flex-col">
          <div className="flex justify-start mb-4">
            <h1 className="display2 text-primary">
              {loading
                ? "Loading Workshops..."
                : `${events.length} Workshop${events.length !== 1 ? "s" : ""} Found`}
            </h1>
          </div>
          <div className="bg-gray opacity-20 w-full h-0.5 my-4"></div>
        </div>

        {/* Event Grid Section */}
        {loading ? (
          <p className="text-center heading4">Loading...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-3 gap-4 mt-8">
            {events.map((event) => (
              <EventBox
                key={event.id}
                image={event.bannerImage}
                title={event.eventNameEN}
                location={`${event.ampNameEN}, ${event.provNameEN}`}
                id={event.id}
              />
            ))}
          </div>
        ) : (
          <div className="text-center">
            <p className="text-center heading4">
              No events found matching your search criteria.
            </p>
            <p className="text-center heading5">
              Please adjust your search filters or try viewing all events.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FilterPageWithState;
