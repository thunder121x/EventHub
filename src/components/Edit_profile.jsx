import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";

const EditProfile = () => {
  return (
    <div className="min-h-screen bg-whitex font-sans">
      {/* Top Navigation Bar */}
      <div className="bg-primary text-white flex justify-between items-center px-8 py-3">
        <div className="flex items-center ">
          {/* logo */}
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
        <aside className="w-1/4 p-8 flex flex-col items-center border-r border-gray-800 mt-10">
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
              className="flex items-center gap-3  text-primary transition-colors duration-200 hover:text-primary"
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
              className="flex items-center gap-3  transition-colors duration-200 hover:text-primary"
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
          <h1 className="text-primary heading2 mb-6">Profile Information</h1>
          <div className="border-b border-gray mb-8"></div>

          <form className="max-w-3xl justify-center items-center ">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">First Name</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px] "
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">Email</label>
                <input
                  type="email"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px]"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px]"
                  placeholder="084 123 4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">Country</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px]"
                  placeholder="Thailand"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2 ">City</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-gray rounded-[10px] mb-10"
                  placeholder="Bangkok"
                />
              </div>
            </div>

            <div className="flex justify-end mt-10">
              <button
                type="submit"
                className="bg-primary text-white px-8 py-3 rounded-full hover:bg-primary h-8 flex items-center justify-center "
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default EditProfile;
