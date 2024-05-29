import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useSelector } from "react-redux";

interface ListSlotsProps {
  slots: Array<any>;
  selectedDate: string;
}

const SlotList: React.FC<ListSlotsProps> = ({ slots, selectedDate }) => {
    const userData = useSelector((state: RootState) => state.userData.user);
  const [booked, setBooked] = useState("");
  const [status, setStatus] = useState("");
  const navigate = useNavigate();
  const { id: doctorId } = useParams(); 

  useEffect(() => {}, [selectedDate]);

  const handleClick = () => {
    const userId = userData?._id; 
    const bookingData = {
      doctor_id: doctorId,
      user_id: userId,
      date: selectedDate,
      slot: status,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));
    
    setBooked(status);
    navigate("/show-payment");
  };

  const SelectSlot = (time: string) => {
    setStatus(time);
  };

  console.log(booked, "booked ~ ");

  return (
    <div>
      <div className="md:px-32">
        {slots.map((appointment) => (
          <div
            key={appointment?._id}
            className="appointment-card bg-white py-4 rounded-[5px] m-4 px-2 text-center text-blue-600"
          >
            <h1 className="px-4 font-bold text-2xl text-blue-800">
              AVAILABILITY
            </h1>
            <h4 className="font-bold my-4 text-sm">CONSULTATION METHODS</h4>
            <div className="grid grid-cols-3 md:px-20">
              {appointment.consultationMethods.map((method: any, idx: any) => (
                <div
                  className="bg-white px-4 font-semibold text-center text-blue-600 py-1 mx-4 my-2 rounded border border-blue-600"
                  key={idx}
                >
                  <h1>{method}</h1>
                </div>
              ))}
            </div>
            <h4 className="font-bold text-sm mt-4">SLOTS</h4>
            <div className="bg-white px-4 grid grid-cols-6">
              {appointment.slots.map((slot: any, idx: any) => (
                <div key={idx}>
                  <div
                    onClick={() => SelectSlot(slot?.start)}
                    className={`${
                      status === slot?.start
                        ? "bg-blue-500 text-white"
                        : "text-blue-600 border-blue-600"
                    } font-semibold m-4 py-1 border text-center rounded`}
                  >
                    {!slot.userId && <h1>{slot.start}</h1>}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={handleClick}
                className="bg-blue-600 text-white px-14 rounded text-sm py-1"
              >
                CONFIRM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotList;
