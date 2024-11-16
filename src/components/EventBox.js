import "../styles.css";
import React from "react";
import { HashLink } from "react-router-hash-link";

function EventBox({ image, title, location, id }) {
  // ตรวจสอบว่ามีข้อมูลหรือไม่ก่อนแสดงผล
  if (!image || !title || !location || !id) {
    return null; // ถ้าไม่มีข้อมูลที่จำเป็นให้ไม่แสดงอะไร
  }

  return (
    <HashLink smooth to={`/EventDetail#top`}>
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden workshopRecommendation my-5">
        <div className="relative">
          <img
            src={image}
            alt="Workshop"
            className="w-full h-52 object-cover"
          />
          <span className="absolute top-4 right-4 bg-secondary px-3 py-1 rounded-full heading5">
            Available
          </span>
        </div>
        <div className="p-4">
          <p className="text-primary heading4 text-start">{location}</p>
          <h3 className="heading3 text-start">{title}</h3>
          <div className="mt-4">
            <HashLink
              smooth
              to={`/event/${id}#top`} // เปลี่ยนไปใช้ HashLink แทน Link
              className="text-secondary underline hover:text-primary"
            >
              View Details
            </HashLink>
          </div>
        </div>
      </div>
    </HashLink>
  );
}

export default EventBox;
