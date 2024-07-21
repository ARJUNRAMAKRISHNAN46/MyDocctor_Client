import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

interface DataDisplayProps {
  selectedDate: Date;
  availableSlots: string[];
}

const DataDisplay: React.FC<DataDisplayProps> = ({ selectedDate, availableSlots }) => {
  const formattedDate: string = selectedDate.toISOString().split("T")[0];
  const [loading, setLoading] = useState<boolean>(false);

  const handleSlotClick = async (slot: string) => {
    try {
      setLoading(true);
      // const response = await axios.post("http://localhost:8080/save-slot", {
      const response = await axios.post("https://mydocctor.online/save-slot", {
        date: formattedDate,
        time: slot,
      });
      console.log("🚀 ~ handleSlotClick ~ response:", response);
      setLoading(false);
      toast.success("Slot booked successfully");
    } catch (error) {
      setLoading(false);
      console.error("🚀 ~ handleSlotClick ~ error:", error);
      toast.error("Failed to book slot");
    }
  };

  return (
    <div>
      {loading && (
        <div className="loader-overlay">
          <ThreeDots color="#0057db" height={100} width={100} />
        </div>
      )}
      <h2>Selected Date: {formattedDate}</h2>
      <h3>Available Slots:</h3>
      {availableSlots.length > 0 ? (
        <div className="slots-container">
          {availableSlots.map((slot, index) => (
            <div
              key={index}
              className="slot-box"
              onClick={() => handleSlotClick(slot)}
            >
              {slot}
            </div>
          ))}
        </div>
      ) : (
        <p>No available slots</p>
      )}
    </div>
  );
};

export default DataDisplay;
