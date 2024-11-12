import React from "react";
import logo from "../assets/logo.png"; // Adjust path to logo as needed
import mail from "../assets/emoji/mail.png";
import phone from "../assets/emoji/phone.png";
import chat from "../assets/emoji/chat.png";
import facebook from "../assets/emoji/facebook.png";
import instagram from "../assets/emoji/instagram.png";
import youtube from "../assets/emoji/youtube.png";

function Footer() {
  return (
    <footer className="bg-primary text-white footer pt-12">
      <div className="container mx-auto flex justify-between items-start space-x-8 footer">
        {/* Left Section */}
        <div className="flex flex-col items-start w-1/3 space-y-4 pt-4">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-[44px] h-[44px]" />
            <h1 className="text-[20px] font-semibold pt-2 text-shadow">
              EventHub
            </h1>
          </div>
          <p className="footer pt-8">
            EventHub offers reservations for local workshops in Thailand.
          </p>
        </div>

        {/* Divider Line */}
        <div className="border-r border-white opacity-30 h-80"></div>

        {/* Middle Section */}
        <div className="pl-10 pt-6 flex flex-col items-start w-1/3 space-y-4">
          <h2 className="text-[20px] font-semibold">Menu</h2>
          <ul className="space-y-2">
            <li>
              <a href="/AboutUs" className="hover:text-gray-200">
                About Us
              </a>
            </li>
            <li>
              <a href="/ExploreWorkshops" className="hover:text-gray-200">
                Explore Workshops
              </a>
            </li>
            <li>
              <a href="/SearchBar" className="hover:text-gray-200">
                Search Bar
              </a>
            </li>
          </ul>
        </div>

        {/* Divider Line */}
        <div className="border-r border-white opacity-30 h-80"></div>

        {/* Right Section */}
        <div className="flex flex-col items-start w-1/3 space-y-4">
          <h2 className="text-[20px] font-semibold pt-4">Contact</h2>
          <div className="flex space-x-4">
            <a
              href="mailto:contact@example.com"
              className="text-2xl hover:text-gray-200"
            >
              <img src={mail} alt="Mail" className="w-[24px] h-[24px]" />
            </a>
            <a href="tel:+1234567890" className="text-2xl hover:text-gray-200">
              <img src={phone} alt="Phone" className="w-[24px] h-[24px]" />
            </a>
            <a
              href="https://wa.me/1234567890"
              className="text-2xl hover:text-gray-200"
            >
              <img src={chat} alt="Chat" className="w-[24px] h-[24px]" />
            </a>
          </div>
          <h2 className="text-lg font-semibold mt-4">Social Media</h2>
          <div className="flex space-x-4">
            <a href="#" className="text-2xl hover:text-gray-200">
              <img src={facebook} alt="Facebook" className="w-[24px] h-[24px]" />
            </a>
            <a href="#" className="text-2xl hover:text-gray-200">
              <img src={instagram} alt="instagram" className="w-[24px] h-[24px]" />
            </a>
            <a href="#" className="text-2xl hover:text-gray-200">
              <img src={youtube} alt="Youtube" className="w-[24px] h-[24px]" />
            </a>
          </div>
        </div>
      </div>
      {/* </footer>
    <footer className="bg-accent text-white py-10"> */}
      {/* <div className="container mx-auto flex justify-between items-start space-x-8">
        </div> */}
      <div className="paragraph2 mt-6 text-white bg-accent pt-4 w-full text-end align-bottom">
        EVENTHUB
      </div>
    </footer>
  );
}

export default Footer;
