import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface AddSlotModalProps {
  show: () => void;
  refresh: () => void;
}

const times = [
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
  "03:00",
  "03:30",
  "04:00",
  "04:30",
];

// interface Slot {
//   start: string;
//   userId?: string;
//   status?: string;
//   reservedAt?: Date | null;
// }

const SlotSelector: React.FC<AddSlotModalProps> = ({ show, refresh }) => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const userData = useSelector((state: RootState) => state.authData.user);

  const handleTimeChange = (time: string) => {
    setSelectedTimes((prevTimes) =>
      prevTimes.includes(time)
        ? prevTimes.filter((t) => t !== time)
        : [...prevTimes, time]
    );
  };

  const handleAddSlots = async () => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const appointments = [];
    if (!start || !end) {
      toast.error("Select a slot");
    }
    for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
      appointments.push({
        date: d.toISOString().split("T")[0],
        slots: selectedTimes.map((time) => ({ start: time })),
        doctorId: userData?._id,
        consultationMethods: [],
      });
    }

    if (appointments?.length === 0) {
      toast.error("No slots selected");
      return;
    }

    for (const appointment of appointments) {
      try {
        await axios
          .post(
            // "http://localhost:8080/appointment/api/create-appointment",
            "https://mydocctor-server-7.onrender.com/appointment/api/create-appointment",
            appointment
          )
          .then((res) => {
            console.log("🚀 ~ ).then ~ res:", res);
          })
          .catch((err) => {
            toast.error(err?.message);
          });
        console.log("Appointment added:", appointment);
      } catch (error) {
        console.error("Error adding appointment:", appointment, error);
      }
    }
    refresh();
    show();
  };

  return (
    <div className="w-[84vw] h-[90vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[86vh]">
        <div>
          <h1 className="text-white text-3xl font-semibold text-center mt-4">
            CHOOSE YOUR SLOTS
          </h1>
          <div className="flex justify-center">
            <div className="py-4 text-white mr-8">
              <label className="mr-4">Start Date:</label>
              <input
                className="bg-gray-800 border px-4 rounded"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
              />
            </div>
            <div className="py-4 text-white">
              <label className="mr-4">End Date:</label>
              <input
                className="bg-gray-800 border px-4 rounded"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="px-20">
            <label className="text-white font-semibold text-lg">
              SELECT SLOTS :
            </label>
            <div className="grid grid-cols-6 text-gray-200">
              {times.map((time) => (
                <div className="mt-4 flex  items-center" key={time}>
                  <input
                    className="mr-4"
                    type="checkbox"
                    id={time}
                    value={time}
                    checked={selectedTimes.includes(time)}
                    onChange={() => handleTimeChange(time)}
                  />
                  <label className="text-lg" htmlFor={time}>
                    {time}
                  </label>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-center w-full">
            <button
              className="bg-blue-600 px-8 py-1 mt-8 rounded-full text-white "
              onClick={handleAddSlots}
            >
              Add Slots
            </button>
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  );
};

export default SlotSelector;
