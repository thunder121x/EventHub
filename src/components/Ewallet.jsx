import React, { useState, useEffect } from "react";
import "../styles.css";

import Approved from "../assets/Approved.png";
import failed from "../assets/failed.png";
import Card from "../assets/Card.png";
import jcb from "../assets/JCB.png";
import Mastercard from "../assets/Mastercard.png";
import logo from "../assets/eventhub_logo.png";
import visa from "../assets/VISA.png";
import LeftNav from "./LeftNav";

import { auth, db } from "../firebase"; // Ensure Firebase setup is imported
import { doc, getDoc, updateDoc } from "firebase/firestore";

const SuccessModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={Approved} alt="Success" className="w-16 h-16" />
        </div>

        <h2 className="heading2 text-text mb-2">Top Up Successful!</h2>
        <p className="paragraph1 text-lightgray mb-4">
          {amount} Baht has been added to your wallet.
        </p>

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

const FailModal = ({ isOpen, onClose, amount }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <img src={failed} alt="Success" className="w-16 h-16" />
        </div>

        <h2 className="heading2 text-text mb-2">Top Up Fail T-T</h2>
        <p className="paragraph1 text-lightgray mb-4">
          {amount} Baht has been added to your wallet.
        </p>

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
        <p className="paragraph1 text-lightgray mb-4">Please wait...</p>

        <div className="flex justify-center mb-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>

        <div className="paragraph2 text-lightgray text-center">
          We are currently verifying your transaction details.
          <br />
          This may take a moment. Do not refresh the page.
        </div>
      </div>
    </div>
  );
};

const EWallet = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [walletBalance, setWalletBalance] = useState(null); // For current balance
  const [user, setUser] = useState(null); // State to store user info

  useEffect(() => {
    // Listen for authentication state changes
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        // Fetch user data from Firestore
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);
        if (userDoc.exists()) {
          setUser(userDoc.data());
          setWalletBalance(userDoc.data().pocket_money || 0);
        } else {
          console.log("User not found in Firestore");
        }
      } else {
        setUser(null); // Set to null if no user is logged in
      }
    });

    return () => unsubscribe(); // Cleanup on component unmount
  }, []);

  const handleTopUp = async (amount) => {
    const user = auth.currentUser;
    setSelectedAmount(amount);
    setIsProcessing(true);

    try {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
          const currentBalance = userDoc.data().pocket_money || 0;
          const updatedBalance = currentBalance + amount;

          await updateDoc(userRef, { pocket_money: updatedBalance });
          setWalletBalance(updatedBalance);
          setIsProcessing(false);
          setIsSuccess(true);
        }
        else{
          setIsProcessing(false);
          setIsFailed(true);
        }
      }
    } catch (error) {
      setIsProcessing(false);
      console.error("Error processing top-up:", error);
    }
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
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
      <FailModal
        isOpen={isFailed}
        onClose={handleSuccessClose}
        amount={selectedAmount}
      />

      <div className="flex">
        {/* Left Sidebar */}
        <LeftNav />

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <div className="flex justify-between items-start">
            <div className="w-3/5">
              <h1 className="text-primary heading2 mb-6 border-b border-lightgray pb-3">
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
                      onClick={() => handleTopUp(amount)}
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
                  <h2 className="flex justify-self-end text-primary heading2">
                    My Wallet
                  </h2>
                </div>
                <p className="flex justify-end text-4xl font-bold mb-6">
                  {walletBalance ? walletBalance : "?"} Baht
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left py-3 px-4 rounded-xl border border-lightgray transition-colors duration-200 hover:text-primary">
                    History Transactions
                  </button>
                  <button className="w-full text-left py-3 px-4 rounded-xl border border-lightgray transition-colors duration-200 hover:text-primary">
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
