import React, { useState } from "react";
import "../styles.css";

import Approved from "../assets/Approved.png";
import Card from "../assets/Card.png";
import jcb from "../assets/JCB.png";
import Loading from "../assets/Loading.png";
import Mastercard from "../assets/Mastercard.png";
import logo from "../assets/eventhub_logo.png";
import visa from "../assets/VISA.png";

const SuccessModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={Approved} alt="Success" className="w-16 h-16" />
        </div>

        <h2 className="heading2 text-text mb-2">Top Up Successful!</h2>
        <p className="paragraph1 text-gray mb-4">
          {amount} Baht has been added to your wallet
        </p>

        <div className="rounded-lg p-4 mb-6">
          <p className="paragraph2 text-gray mb-2">Transaction Details</p>
          <p className="heading3">{amount} Baht</p>
          <p className="paragraph2 text-gray">
            {new Date().toLocaleDateString()} -{" "}
            {new Date().toLocaleTimeString()}
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full px-6 py-3 rounded-full bg-primary text-white hover:bg-opacity-90"
        >
          Done
        </button>
      </div>
    </div>
  );
};

const ProcessingModal = ({ isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <h2 className="heading2 text-text mb-4">Processing Your Transaction</h2>
        <p className="paragraph1 text-gray mb-4">Please wait...</p>

        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div className="paragraph2 text-gray text-center">
          We are currently verifying your transaction details.
          <br />
          This may take a moment. Do not refresh the page.
        </div>
      </div>
    </div>
  );
};

const Ewallet = ({ isOpen, onClose, onSave }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px]">
        <h2 className="heading2 text-text mb-6">Add Credit/Debit Card</h2>

        <div className="mb-6">
          <div className="flex justify-between gap-2 mb-4">
            <div className="flex justify-start gap-3">
              <img src={Card} alt="Card" className=" w-4 h-4" />
              Card Information
            </div>
            <div className="flex justify-end gap-3">
              <img src={jcb} alt="JCB" className="h-6" />
              <img src={visa} alt="Visa" className="h-6" />
              <img src={Mastercard} alt="Mastercard" className="h-6" />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block paragraph2 mb-1">Card number</label>
            <input
              type="text"
              placeholder="1234 5678 9123 4567"
              className="w-full p-2 border border-gray rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block paragraph2 mb-1">EXP</label>
              <input
                type="text"
                placeholder="07 / 27"
                className="w-full p-2 border border-gray rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="w-1/2">
              <label className="block paragraph2 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full p-2 border border-gray rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block paragraph2 mb-1">Name on Card</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full p-2 border border-gray rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <p className="paragraph2 text-gray mt-4">
            The system will deduct 1 baht from your card for identity
            verification. You will receive this amount back within 14 business
            days.
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-full border border-gray hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-6 py-2 rounded-full bg-primary text-white hover:bg-opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
const EWallet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const handleTopUp = (amount) => {
    setSelectedAmount(amount);
    setIsModalOpen(true);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    setIsProcessing(true);

    // Simulate processing delay
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    window.location.href = "/wallet-info"; // Replace with your actual route
  };

  return (
    <div className="min-h-screen bg-whitex font-sans">
      {/* Processing Modal */}
      <ProcessingModal isOpen={isProcessing} />

      {/* Success Modal */}
      <SuccessModal
        isOpen={isSuccess}
        onClose={handleSuccessClose}
        amount={selectedAmount}
      />

      {/* Credit Card Modal */}
      <Ewallet
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />
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
          <div className="flex justify-between items-start">
            <div className="w-3/5">
              <h1 className="text-primary heading2 mb-6 border-b border-gray pb-3">
                Top Up to your wallet
              </h1>
              <div className="space-y-8">
                {[150, 300, 750, 1500, 3000].map((amount) => (
                  <div
                    key={amount}
                    className="flex items-center justify-between bg-white rounded-lg p-3 shadow-sm"
                  >
                    <span className="text-lg font-medium ml-4">
                      Add {amount} Baht
                    </span>
                    <button
                      className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-opacity-90"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Top Up
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm mt-14">
                <div className="flex items-center justify-end gap-2 mb-4">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    className="text-primary"
                  >
                    <path
                      d="M21 4H3C1.89543 4 1 4.89543 1 6V18C1 19.1046 1.89543 20 3 20H21C22.1046 20 23 19.1046 23 18V6C23 4.89543 22.1046 4 21 4Z"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M1 10H23"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <h2 className="flex justify-self-end text-primary heading2">
                    My Wallet
                  </h2>
                </div>
                <p className="flex justify-end text-4xl font-bold mb-6">
                  1500 Baht
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:text-primary">
                    History Transactions
                  </button>
                  <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors duration-200 hover:text-primary">
                    E-Coupon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EWallet;
