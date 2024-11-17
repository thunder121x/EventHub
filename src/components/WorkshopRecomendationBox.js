import "../styles.css";
import React from "react";
import mockImage from "../assets/ws_mock.png";
import { HashLink } from "react-router-hash-link";

//i here gaaf
function WorkshopRecommendationBox({ id, image, title, location }) {
  return (
    <HashLink smooth to={`/EventDetail#top?id=${id}`}>
      <div className="max-w-sm mx-auto bg-white rounded-3xl shadow-lg overflow-hidden workshopRecommendation my-5">
        <div className="relative">
          <img
            src={image}
            alt={title}
            className="w-full h-52 object-cover"
          />
          <span className="absolute top-4 right-4 bg-secondary px-3 py-1 rounded-full heading5">
            Available
          </span>
        </div>
        <div className="p-4">
          <p className="text-primary heading4 text-start">{location}</p>
          <h3 className="heading3 text-start">{title}</h3>
        </div>
      </div>
    </HashLink>
  );
}

export default WorkshopRecommendationBox;

