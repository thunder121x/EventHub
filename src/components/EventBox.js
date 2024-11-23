import "../styles.css";
import React from "react";
import { Link } from "react-router-dom"; // เปลี่ยนมาใช้ Link แทน HashLink

function EventBox({ image, title, location, id }) {
  if (!image || !title || !location || !id) {
    return null; // ถ้าไม่มีข้อมูลที่จำเป็นให้ไม่แสดงอะไร
  }

  return (
    <Link to={`/EventDetail/${id}`}> {/* ใช้ Link แทน HashLink */}
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
            <Link
              to={`/EventDetail/${id}`} // เปลี่ยนไปใช้ Link
              className="text-secondary underline hover:text-primary"
            >
            </Link>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default EventBox;
