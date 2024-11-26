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
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  collection,
  query,
  getDocs,
} from "firebase/firestore";

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

        <h2 className="heading2 text-text mb-2">Payment Failed</h2>
        <p className="paragraph3 text-gray mb-4">
          There is an issue with the payment process, the money cannot be added
          to your account at this time.
        </p>

        <button
          onClick={onClose}
          className=" px-8 py-3 rounded-full bg-primary heading3 text-white hover:bg-opacity-90"
        >
          Back
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
const Credit = ({ isOpen, onClose }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [exp, setExp] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const verifyCard = async ({ cardNumber, exp, cvv, nameOnCard }) => {
    // const isValidCard = luhnCheck(cardNumber) && exp && cvv && nameOnCard;

    // if (!isValidCard) {
    //   throw new Error("Invalid card details. Please check your input.");
    // }

    const user = auth.currentUser;
    if (user) {
      const maskedCard = cardNumber.slice(-4); // Mask card for privacy
      const userRef = doc(db, "users", user.uid, "verified_cards", cardNumber);

      await setDoc(
        userRef,
        {
          cardNumber: `**** **** **** ${maskedCard.split()}`,
          exp,
          cvv,
          nameOnCard,
          verifiedAt: new Date(),
        },
        { merge: true } // Ensures only specified fields are added/updated
      );

      return true; // Verification successful
    } else {
      throw new Error("User not authenticated");
    }
  };

  const luhnCheck = (cardNumber) => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber[i]);

      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }

      sum += digit;
      shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await verifyCard({ cardNumber, exp, cvv, nameOnCard });
      alert("Card Verified Successfully!");
      onClose();
    } catch (error) {
      alert(error.message || "Card verification failed.");
    } finally {
      setIsSaving(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 w-[500px]">
        <h2 className="heading2 text-text mb-6">Add Credit/Debit Card</h2>

        <div className="space-y-4">
          <div>
            <label className="block paragraph2 mb-1">Card number</label>
            <input
              type="text"
              placeholder="1234 5678 9123 4567"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              className="w-full p-2 border border-lightgray rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <div className="flex gap-4">
            <div className="w-1/2">
              <label className="block paragraph2 mb-1">EXP</label>
              <input
                type="text"
                placeholder="MM / YY"
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                className="w-full p-2 border border-lightgray rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
            <div className="w-1/2">
              <label className="block paragraph2 mb-1">CVV</label>
              <input
                type="text"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                className="w-full p-2 border border-lightgray rounded-lg focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block paragraph2 mb-1">Name on Card</label>
            <input
              type="text"
              placeholder="John Doe"
              value={nameOnCard}
              onChange={(e) => setNameOnCard(e.target.value)}
              className="w-full p-2 border border-lightgray rounded-lg focus:outline-none focus:border-primary"
            />
          </div>

          <p className="paragraph2 text-lightgray mt-4">
            The system will deduct 1 baht from your card for identity
            verification. You will receive this amount back within 14 business
            days.
          </p>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            disabled={isSaving}
            className="px-6 py-2 rounded-full border border-lightgray hover:bg-lightgray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`px-6 py-2 rounded-full ${
              isSaving
                ? "bg-lightgray text-darkgray"
                : "bg-primary text-white hover:bg-opacity-90"
            }`}
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
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
  const [walletBalance, setWalletBalance] = useState(null);
  const [availableCard, setAvailableCard] = useState(null);
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Credit Modal state


    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const userRef = doc(db, "users", user.uid);
          const userDoc = await getDoc(userRef);

          if (userDoc.exists()) {
            setUser(userDoc.data());
            setWalletBalance(userDoc.data().pocket_money || 0);
          } else {
            console.log("User data not found in Firestore");
          }

          const cardsCollectionRef = collection(
            db,
            "users",
            user.uid,
            "verified_cards"
          );

      // Query the collection to get all documents
      const querySnapshot = await getDocs(cardsCollectionRef);
          // if (!querySnapshot.empty) {
          //   console.log("At least one card exists!");
          //   querySnapshot.forEach((doc) => {
          //     console.log("Card data:", doc.id, doc.data());
          //   });
          //   setAvailableCard(true);
          // }
                try {
                  const querySnapshot = await getDocs(cardsCollectionRef);
                  setAvailableCard(querySnapshot.size || 0);
                } catch (error) {
                  console.error("Error fetching cards:", error);
                }
        } else {
          setUser(null);
        }
      });

      return () => unsubscribe();
    }, []);

  const handleTopUp = async (amount) => {
    const user = auth.currentUser;
    setSelectedAmount(amount);
    setIsProcessing(true);

    // Reference to the "verified_cards" collection
    const cardsCollectionRef = collection(
      db,
      "users",
      user.uid,
      "verified_cards"
    );

    try {
      // Query the collection to get all documents
      const querySnapshot = await getDocs(cardsCollectionRef);

      if (!querySnapshot.empty) {
        console.log("At least one card exists!");
        querySnapshot.forEach((doc) => {
          console.log("Card data:", doc.id, doc.data());
        });

        try {
          if (user) {
            const userRef = doc(db, "users", user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists()) {
              const currentBalance = userDoc.data().pocket_money || 0;
              const updatedBalance = currentBalance + amount;

              // ใช้ merge: true เพื่อไม่ให้ข้อมูลที่มีอยู่ใน users ถูกลบ
              await setDoc(
                userRef,
                { pocket_money: updatedBalance },
                { merge: true }
              );
              setWalletBalance(updatedBalance);
              setIsProcessing(false);
              setIsSuccess(true);
            } else {
              throw new Error("User document does not exist.");
            }
          } else {
            throw new Error("No authenticated user found.");
          }
        } catch (error) {
          console.error("Error processing top-up:", error);
          setIsProcessing(false);
          setIsFailed(true);
        }
      } else {
        console.log("No cards found!");
          setIsProcessing(false);
          setIsFailed(true);
      }
    } catch (error) {
      console.error("Error checking cards collection:", error);
          setIsProcessing(false);
          setIsFailed(true);
    }
  };

  
  const handleSuccessClose = () => {
    setIsSuccess(false);
    setIsFailed(false);
    setIsProcessing(false);
  };

  const handleSave = () => {
    setIsModalOpen(false);
    alert("Card added successfully!");
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

      {/* Failure Modal */}
      <FailModal
        isOpen={isFailed}
        onClose={handleSuccessClose}
        amount={selectedAmount}
      />

      {/* Credit Card Modal */}
      <Credit
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
      />

      <div className="flex">
        {/* Left Sidebar */}
        <LeftNav />

        {/* Main Content */}
        <main className="w-3/4 p-8 mt-10">
          <div className="flex justify-between items-start">
            {/* Top-Up Section */}
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

            {/* Wallet Section */}
            <div className="w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm mt-14">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-primary heading2">My Wallet</h2>
                  {availableCard !== 0 ? (
                    <div className="flex flex-row">
                      <p className="paragraph2">
                        {availableCard} Available Card{" "}
                      </p>

                      <button
                        className="bg-white text-black rounded-lg px-2 paragraph2 hover:bg-opacity-90"
                        onClick={() => setIsModalOpen(true)}
                      >
                        +
                      </button>
                    </div>
                  ) : (
                    <button
                      className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-opacity-90"
                      onClick={() => setIsModalOpen(true)}
                    >
                      Add Card
                    </button>
                  )}
                </div>
                <p className="flex justify-end text-4xl font-bold mb-6">
                  {walletBalance !== null ? walletBalance : "?"} Baht
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
