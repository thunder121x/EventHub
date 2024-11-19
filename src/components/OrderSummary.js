import "../styles.css";
import React from "react";

import food from "../assets/Food.png";
const OrderSummary = () => {
  return (<div className="w-1/3 pl-8 mt-20">
  <div className="bg-white rounded-lg shadow-md">
    <img src={food} alt="People cooking in a kitchen" className="rounded-lg" />
    <div className="p-4">
      <h3 className="text-lg font-bold mb-2">Order summary</h3>
      <p className="flex text-[13px] mb-2 border-b pb-3">
        Monday, December 23 10 - 14 pm.
      </p>
      <div className="flex justify-between text-[13px] mb-2">
        <span>Delivery</span>
      </div>
      <div className="flex justify-between text-[13px] mb-2 border-b pb-3">
        <span>3 x eTicket</span>
        <span>$90.00</span>
      </div>
      <div className="flex justify-between text-lg font-bold mb-2">
        <span>Total</span>
        <span>$90.00</span>
      </div>
      <div className="flex justify-between text-[13px] text-gray mb-2">
        <span>Remaining Balance</span>
        <span>$200.01</span>
      </div>
    </div>
  </div>
</div>

  );
}

export default OrderSummary;
