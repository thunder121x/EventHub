import React from "react";
import "../styles.css";

import food from "../assets/Food.png";

const ReservOne = () => {
  return (
    <div className="mt-10 flex items-center justify-center mx-20">
      <div className="w-full flex ">
        <div className="w-2/3 pr-8">
          <h2 className="heading1 pb-2">Contact information</h2>
          <p className="paragraph1 mb-4">
            Logged in as{" "}
            <span className="text-[15px] font-bold">JohnDoe@gmail.com</span>.{" "}
            <a href="#" className="paragraph1 text-accent">
              Not you?
            </a>
          </p>
          <h3 className="heading2 mb-4 pb-2">Primary Contact</h3>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block heading3 mb-1 pb-2 ">First Name</label>
              <input
                type="text"
                className="w-full pl-4 py-2 pr-2 border border-gray rounded-[10px]  "
                placeholder="John"
              />
            </div>
            <div>
              <label className="block heading3 mb-1 pb-2">Last Name</label>
              <input
                type="text"
                className="w-full pl-4 py-2 pr-2 border border-gray rounded-[10px]"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block heading3 mb-1 pb-2">Email</label>
            <div className="flex items-center border border-gray rounded-[10px] p-2 bg-white">
              <i className="fas fa-envelope mr-2"></i>
              <input
                type="email"
                className="w-full  border-none outline-none"
                placeholder="JohnDoe@gmail.com"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block heading3 mb-1 pb-2">Phone number</label>
            <div className="flex w-6/12 items-center border border-gray rounded-[10px] p-2 bg-white">
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
          <div className="flex paragraph2 mb-4 pb-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Keep me updated or more events and news from this event organizer
            </label>
          </div>
          <div className="flex paragraph2 mb-4 pb-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              Send me emails about the best events happening nearby or online.
            </label>
          </div>
          <p className="p mb-4 border-gray border-b pb-7">
            By selecting Register, I agree to the{" "}
            <a href="#" className="text-blue-600">
              Eventhub Terms of Service
            </a>
          </p>
          <button className="text-[20px] bg-primary text-white py-2 px-20 rounded-full w-100 font-bold">
            Submit
          </button>
          <p className="text-[13px] mt-4">
            Powered by <span className="font-bold">EventHub</span>
          </p>
        </div>
        <div className="w-1/3 pl-8 mt-20">
          <div className="bg-white  rounded-lg shadow-md ">
            <img
              src={food}
              alt="People cooking in a kitchen"
              className="rounded-lg"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold mb-2">Order summary</h3>
              <p className="flex text-[13px] mb-2 border-b pb-3">
                Monday, December 23 10 - 14 pm.
              </p>
              <div className="flex justify-between text-[13px] mb-2 ">
                <span>Delivery</span>
              </div>
              <div className="flex justify-between text-[13px] mb-2 border-b pb-3">
                <span>1 x ticket</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between text-lg font-bold mb-2">
                <span>Total</span>
                <span>$30.00</span>
              </div>
              <div className="flex justify-between text-[13px] text-gray mb-2 ">
                <span>Remaining Balance</span>
                <span>$200.01</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservOne;
