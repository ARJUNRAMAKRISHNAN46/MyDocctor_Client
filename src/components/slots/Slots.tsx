import React, { useState } from "react";
import "./Slots.css";
import CalendarComponent from "./CalendarComponent";
import DataDisplay from "./DataDisplay";
import { ThreeDots } from "react-loader-spinner";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface SlotByDay {
  [key: string]: string[];
}

const slotByDay: SlotByDay = {
  Monday: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
  ],
  Tuesday: [
    "09:00",
    "09:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
  ],
  Wednesday: [
    "09:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "01:00",
    "01:30",
  ],
  Thursday: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "02:00",
    "02:30",
  ],
  Friday: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "01:00",
    "01:30",
    "02:00",
    "02:30",
  ],
  Saturday: [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
  ],
  Sunday: [],
};

interface SlotsProps {}

const Slots: React.FC<SlotsProps> = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);

  const handleDateChange = async (date: Date) => {
    console.log("🚀 ~ handleDateChange ~ date:", date);
    setLoading(true);

    const dayOfWeek: string = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    setAvailableSlots(slotByDay[dayOfWeek]);
    setLoading(false);
    setSelectedDate(date);
  };

  return (
    <div className="app-container bg-white">
      <ToastContainer />
      {loading && (
        <div className="loader-overlay">
          <ThreeDots color="#0057db" height={100} width={100} />
        </div>
      )}
      <div className="calendar-container">
        <CalendarComponent onDateChange={handleDateChange} />
      </div>
      <div className="data-display-container">
        <DataDisplay
          selectedDate={selectedDate}
          availableSlots={availableSlots}
        />
      </div>
    </div>
  );
};

export default Slots;
