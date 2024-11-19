import React from "react";
// import "../styles/EventDetail.css";

function InstructorProfile() {
  return (
    <div className="instructor-profile">
      <img src="instructor.jpg" alt="Instructor" className="instructor-photo" />
      <div className="instructor-info">
        <h4>John Doe</h4>
        <p>Monkey Protector</p>
        <a href="#">View Profile</a>
      </div>
    </div>
  );
}

export default InstructorProfile;
