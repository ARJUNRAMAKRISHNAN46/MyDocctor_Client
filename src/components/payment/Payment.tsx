import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {

    const makePayment = async() => {
        const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
        const totalAmount = "from local storage";
        const body = {
            totalAmount: totalAmount,
            doctor_id: "doctorId",
            user_id: "userId",
            date: "date",
            time: "time",
        }

        const response = await 
    }

  return (
    <div>
      <h1>React stripe demo</h1>
    </div>
  );
}

export default Payment;
