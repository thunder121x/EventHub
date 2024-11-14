import React from "react";
import "../styles/FeatureBox.css";
import featureImage1 from "../assets/feature1.png";
import featureImage2 from "../assets/feature2.png";
import featureImage3 from "../assets/feature3.png";
import featureImage4 from "../assets/feature4.png";
import featureImage5 from "../assets/feature5.png";

const features = [
  {
    image: featureImage1,
    title: "Quick & Easy Booking",
    description:
      "Book your spot in workshops in just a few clicks—no hassle, no delay, just smooth and efficient booking for your favorite activities.",
  },
  {
    image: featureImage2,
    title: "Filter by Category",
    description:
      "Easily find workshops that match your interests by filtering through categories. Discover exactly what you're looking for.",
  },
  {
    image: featureImage3,
    title: "Secure Payments",
    description:
      "Complete payments for workshops securely within our platform, with no hidden fees or unnecessary steps.",
  },
  {
    image: featureImage4,
    title: "Instant Ticket Confirmation",
    description:
      "Reserve your spot and complete payment to receive your ticket instantly with no waiting time.",
  },
  {
    image: featureImage5,
    title: "Manage Your Reservations",
    description:
      "Keep track of all your workshop bookings with ease. Our platform simplifies every aspect of your experience.",
  },
];

const FeatureBox = () => {
  return (
    <div className="feature-box-container">
      {features.map((feature, index) => (
        <div
          key={index}
          className="feature-box flex flex-col items-center justify-center m-4 py-12 px-8"
        >
          <img src={feature.image} alt={feature.title} className="icon" />
          <h3 className="search text-primary">{feature.title}</h3>
          <p className="paragraph2">{feature.description}</p>
        </div>
      ))}
    </div>
  );
};

export default FeatureBox;
