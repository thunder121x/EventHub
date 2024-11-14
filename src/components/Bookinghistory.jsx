import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";

const BookingHistory = () => {
  return (
    <div className="min-h-screen bg-whitex font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
        <div className="flex items-center">
          <img src={logo} alt="EventHub logo" className="mr-2 w-10 h-10" />
          <button className="navtext font-bold">EventHub</button>
        </div>
        <nav className="flex items-center gap-8">
          <a href="#" className="navtext">
            Search Bar
          </a>
          <a href="#" className="navtext">
            Explore Workshops
          </a>
          <a href="#" className="navtext">
            About Us
          </a>
          <div className="w-8 h-8 rounded-full bg-whitex overflow-hidden">
            <img
              src="/api/placeholder/32/32"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </nav>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <aside className="w-1/4 p-8 flex flex-col items-center border-r border-gray mt-10">
          <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border">
            <img
              src="/api/placeholder/80/80"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl font-semibold mb-8">John Doe</h2>

          <nav className="w-full space-y-6">
            <a
              href="#"
              className="flex items-center gap-3 transition-colors duration-200 hover:text-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-current"
              >
                <path
                  d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Edit Profile</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 text-primary transition-colors duration-200 hover:text-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-current"
              >
                <path
                  d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M12 6V12L16 14"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Booking History</span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 transition-colors duration-200 hover:text-primary"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-current"
              >
                <path
                  d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 10H23"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>E-Wallet</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <h1 className="text-primary heading2 mb-6">Booking History</h1>
          <div className="border-b border-gray mb-8"></div>

          <div className="space-y-10">
            {/* Upcoming Workshop Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-transparent flex-wrap ">
              <div className="flex items-center gap-8 ">
                <img
                  src="/api/placeholder/120/120"
                  alt="Thai Cooking"
                  className="w-24 h-24 rounded-full object-cover  border"
                />
                <div className="flex-grow">
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <p className="text-primary mb-1">Workshop:</p>
                      <p className="text-gray">Authentic Thai Cooking</p>
                    </div>
                    <div>
                      <p className="text-primary mb-1">Date & Time:</p>
                      <p className="text-gray">11 December 2024, 2PM</p>
                    </div>
                    <div className="justify-self-end">
                      <span className="px-6 py-4 bg-primary text-white rounded-full">
                        Upcoming
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Previous Workshop Card */}
            <div className="bg-white p-6 rounded-lg shadow-sm border  border-transparent flex-wrap">
              <div className="flex items-center gap-8 ">
                <img
                  src="/api/placeholder/120/120"
                  alt="Muay Thai"
                  className="w-24 h-24 rounded-full object-cover border"
                />
                <div className="flex-grow">
                  <div className="grid grid-cols-3 items-center">
                    <div>
                      <p className="text-primary mb-1">Workshop:</p>
                      <p className="text-gray">Traditional Muay Thai</p>
                    </div>
                    <div>
                      <p className="text-primary mb-1">Date & Time:</p>
                      <p className="text-gray">25 October 2024, 1PM</p>
                    </div>
                    <div className="justify-self-end">
                      <span className="px-6 py-4 bg-gray text-white rounded-full">
                        Previous
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BookingHistory;
