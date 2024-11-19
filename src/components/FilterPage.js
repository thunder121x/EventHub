import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import EventBox from "./EventBox";
import headerImage from "../assets/header.png";
import searchIcon from "../assets/emoji/searchIcon.png";

function FilterPageWithState() {
  const location = useLocation();
  const {
    workshopType = "All Events",
    province,
    startDate,
    endDate,
  } = location.state || {};  // ตรวจสอบว่าได้รับค่าหรือไม่

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        let eventQuery = collection(db, "event");

        // Define the filters array
        const filters = [];

        // สร้างเงื่อนไขการกรอง
        if (workshopType !== "All Events") {
          filters.push(where("eventTypeEN", "==", workshopType)); // กรองตาม workshopType
        }
        if (province) {
          filters.push(where("provNameEN", "==", province)); // กรองตาม province
        }

        if (filters.length > 0) {
          eventQuery = query(eventQuery, ...filters); // เปลี่ยนเป็น filters
        }

        const querySnapshot = await getDocs(eventQuery);
        const fetchedEvents = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setEvents(
          fetchedEvents.filter(
            (event) =>
              event.bannerImage &&
              event.eventNameEN &&
              event.ampNameEN &&
              event.provNameEN
          )
        );
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [workshopType, province]);  // ดึงข้อมูลใหม่เมื่อ workshopType หรือ province เปลี่ยนแปลง

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
        <FilterPage
          workshopType={workshopType}
          province={province}
          startDate={new Date(startDate)}
          endDate={new Date(endDate)}
        />
      </header>

      {/* Event Count Section */}
      <div className="px-20 py-10">
        <div className="flex-col">
          <div className="flex justify-start mb-4">
            <h1 className="display2 text-primary">
              {loading
                ? "Loading Workshops..."
                : `${events.length} Workshop${
                    events.length !== 1 ? "s" : ""
                  } Found`}
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
                startDate={new Date(startDate)}  // ส่ง startDate และ endDate ให้กับ EventBox
                endDate={new Date(endDate)}      
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

function FilterPage({ workshopType, province, startDate, endDate }) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex items-center bg-white py-1 px-4 rounded-[21px] shadow-lg max-w text-black">
        {/* Province */}
        <div className="flex items-center px-4">
          <span className="heading4">{province}</span>
        </div>

        {/* Divider */}
        <div className="border-l-2 h-8 mx-4" />

        {/* Date Range */}
        <div className="flex items-center px-4">
          <span className="heading4">
            {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
          </span>
        </div>

        {/* Divider */}
        <div className="border-l-2 h-8 mx-4" />

        {/* Workshop Type */}
        <div className="flex items-center px-4">
          <span className="heading4">{workshopType}</span>
        </div>

        {/* Search Icon */}
        <div className="ml-4">
          <button className="bg-purple-500 p-2 rounded-full">
            <img
              src={searchIcon}
              alt="SearchIcon"
              className="w-6 h-6 text-white"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FilterPageWithState;
