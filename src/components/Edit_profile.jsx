import React from "react";
import "../styles.css";
import logo from "../assets/eventhub_logo.png";
import profile from "../assets/Profile.jpg";
import LeftNav from "./LeftNav";

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
              src={profile}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </nav>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <LeftNav/>

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <h1 className="text-primary heading2 mb-6">Profile Information</h1>
          <div className="border-b border-lightgray mb-8"></div>

          <form className="max-w-3xl justify-center items-center ">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">First Name</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px] "
                  placeholder="John"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Last Name</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">Email</label>
                <input
                  type="email"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder="JohnDoe@gmail.com"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2">Phone Number</label>
                <input
                  type="tel"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder="084 123 4567"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block heading3 mb-1 pb-2">Country</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px]"
                  placeholder="Thailand"
                />
              </div>
              <div>
                <label className="block heading3 mb-1 pb-2 ">City</label>
                <input
                  type="text"
                  className="w-4/5 pl-4 py-2 pr-2 border border-lightgray rounded-[10px] mb-10"
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
