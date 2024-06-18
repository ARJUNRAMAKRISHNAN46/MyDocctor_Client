import React, { useEffect } from "react";
import axios from "axios";

const accessToken = localStorage.getItem('access_token'); 
const refreshToken = localStorage.getItem('refresh_token');

const CompleteBooking: React.FC = () => {
  useEffect(() => {
    console.log("useEffect worked herrrrrrrr")
    const bookingData = localStorage.getItem("bookingData");
    if (bookingData) {
      const parsedBookingData = JSON.parse(bookingData);

      axios
        .post("/api/bookings", parsedBookingData, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${accessToken} ${refreshToken}`,
          },
        })
        .then((response) => {
          console.log("Booking successful:", response.data);
          localStorage.removeItem("bookingData");
        })
        .catch((error) => {
          console.error("Error booking appointment:", error);
        });
    }
  }, []);

  return (
    <div>
      <h1>Booking Complete</h1>
      <p>Your booking has been successfully processed.</p>
    </div>
  );
};

export default CompleteBooking;
