import React from "react";
import { useNavigate } from "react-router-dom";

const AttendeeForm = ({ numberOfBooking }) => {

  const navigate = useNavigate();
  // Generate titles dynamically based on numberOfBooking
  const attendeeTitles = ["Primary Contact", ...Array(numberOfBooking - 1).fill(null).map((_, i) => `Attendee ${i + 2}`)];

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/ReservationConfirmation#top`, {
      state: {
        numberOfBooking: numberOfBooking,
      },
    });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="container mx-auto">
        {attendeeTitles.map((title, index) => (
          <div key={index} className="mb-8">
            <h3 className="heading2 mb-4 pb-2">{title}</h3>

            {/* Responsive grid for name inputs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block heading3 mb-1 pb-2">First Name</label>
                <input
                  type="text"
                  className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  className="w-full pl-4 py-2 pr-2 border border-lightgray rounded-lg"
                  placeholder="Doe"
                />
              </div>
            </div>

            {/* Email input */}
            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Email</label>
              <div className="flex items-center border border-lightgray rounded-lg p-2 bg-white">
                <i className="fas fa-envelope mr-2"></i>
                <input
                  type="email"
                  className="w-full border-none outline-none"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
            </div>

            {/* Phone number input */}
            <div className="mb-4">
              <label className="block heading3 mb-1 pb-2">Phone Number</label>
              <div className="flex items-center border border-lightgray rounded-lg p-2 bg-white w-full md:w-6/12">
                <select className="border-none outline-none bg-transparent">
                  <option>TH</option>
                </select>
                <input
                  type="text"
                  className="w-full border-none outline-none"
                  placeholder="+66 (555) 000-0000"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Checkboxes */}
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

      {/* Terms and Submit */}
      <p className="p mb-4 border-lightgray border-b pb-7">
        By selecting Register, I agree to the{" "}
        <a href="#" className="text-blue-600">
          EventHub Terms of Service
        </a>
      </p>
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
