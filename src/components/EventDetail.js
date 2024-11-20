import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import EventInfoCard from "./EventInfoCard";
import StarRating from "./StarRating";
import WorkshopRecommendationBox from "./WorkshopRecomendationBox";
import Footer from "./Footer";
import BackButton from "./function";
import WorkShop3Box from "./WorkShop3Box";

//commit
const EventDetail = () => {
  const { id } = useParams(); // Receive event ID from URL
  const [event, setEvent] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    // Fetch event data from Firestore
    const fetchEvent = async () => {
      const docRef = doc(db, "event", id); // Use ID from URL
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log(docSnap.data());
        setEvent(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchEvent();
  }, [id]);

  if (!event) return <p>Loading...</p>; // Display loading message while fetching data

  // Image Carousel
  const images = [
    event.bannerImage,
    event.image_1,
    event.image_2,
  ].filter(Boolean); // Only include valid images

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Render icons for facilities
  const renderFacilityIcon = (isAvailable) => (
    <span className={`text-lg ${isAvailable ? "text-green-500" : "text-red-500"}`}>
      {isAvailable ? "✔️" : "❌"}
    </span>
  );

  return (
    <div className="bg-background min-h-screen pt-36">
      <div className="flex gap-4">
        <div className="mr-2 pl-24">
          <BackButton />
        </div>
        <div className="flex-grow">
          <div className="flex">
            <p className="text-primary paragraph1 mb-2">{event.eventTypeEN}</p>
            <p className="paragraph1 mb-2"> / {event.eventNameEN}</p>
          </div>

          {/* Event Title */}
          <h1 className="heading1 text-[#302D27] mb-2">{event.eventNameEN}</h1>

          {/* Star Rating */}
          <div className="flex justify-between mb-4">
            <div className="flex">
              <StarRating rating={event.rating || 4.5} />
              <span className="m-2">({event.reviews || 37})</span>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-36 pl-14 pr-8">
        {/* Main Content Area */}
        <div className="max-w-[720px] pt-10">
          {/* Class Image Carousel */}
          <div className="relative mb-4">
            {images.length > 0 && (
              <div className="relative">
                <button
                  onClick={handlePrev}
                  className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full z-10"
                >
                  {"<"}
                </button>
                <img
                  src={images[currentImageIndex]}
                  alt={`Event Image ${currentImageIndex + 1}`}
                  className="rounded-lg w-[720px] h-[320px] object-cover"
                />
                <button
                  onClick={handleNext}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-200 px-2 py-1 rounded-full z-10"
                >
                  {">"}
                </button>
              </div>
            )}
          </div>

          {/* Class Details */}
          <div className="flex justify-between">
            <h2 className="heading2 mb-2">Class details:</h2>
            <p className="text-sm text-gray mb-2">Updated on {event.updatedAt || "N/A"}</p>
          </div>
          <p className="paragraph2 text-lightblack mb-4">
            {event.descEN || "No description available for this event."}
          </p>

          {/* Facilities Section */}
          <div className="text-lightblack paragraph2 leading-relaxed">
            <h2 className="heading2 mb-2">Facilities</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Smoking Area: {renderFacilityIcon(event.smoking_area)}</li>
              <li>Wheelchair Service: {renderFacilityIcon(event.wheelchair_service)}</li>
              <li>Internet WiFi: {renderFacilityIcon(event.internet_wifi)}</li>
            </ul>
          </div>

          {/* Cotact */}
          <div className="text-lightblack paragraph2 pb-10">
            <h2 className="heading2 mb-2">Contact</h2>
              <div>
                <p className="text-[16px] text-base leading-none text-lightblack ">
                  {event.eventTel || "Not Provided"}
                </p>
              </div>
            </div>
        </div>

        {/* Sidebar */}
        <EventInfoCard id={id} /> {/* Send id to EventInfoCard */}
      </div>
      <div className="text-lightblack paragraph2 leading-relaxed px-32">
        <h2 className="heading2 mb-2">Other events you may like</h2>
          <WorkShop3Box />
      </div>
      <Footer />
    </div>
  );
};

export default EventDetail;
