import React, { useEffect, useState } from "react";
import DoctorAddSlotModal from "../../modal/DoctorAddSlotModal";
import { ListSlotsProps } from "../../../types/slotBooking";

const ListSlots: React.FC<ListSlotsProps> = ({ slots, selectedDate }) => {
  const [showSlot, setShowSlot] = useState<boolean>(false);

  const closeSlotAddModal = () => {
    setShowSlot(false);
  };

  useEffect(() => {
    setShowSlot(false);
  }, [selectedDate]);

  const openModal = () => {
    setShowSlot(true);
  };

  return (
    <div>
      {slots.length === 0 ? (
        <div className="flex justify-center">
          {showSlot ? (
            <DoctorAddSlotModal show={closeSlotAddModal} date={selectedDate} />
          ) : (
            <button
              className="text-sm font-semibold text-white bg-green-600 px-8 py-1 rounded"
              onClick={openModal}
            >
              Add Slot
            </button>
          )}
        </div>
      ) : (
        <div className="md:px-32">
          {slots.map((appointment) => (
            <div
              key={appointment?._id}
              className="appointment-card bg-gray-700 py-8 rounded-[5px] m-4 px-2 text-center text-white"
            >
              <h1 className="px-4 font-bold text-xl text-green-400">
                AVAILABILITY
              </h1>
              <h4 className="font-semibold my-4 text-sm">
                CONSULTATION METHODS
              </h4>
              <div className="grid grid-cols-3 md:px-20">
                {appointment.consultationMethods.map((method, idx) => (
                  <div
                    className="bg-gray-700 px-4 text-center text-white py-1 mx-4 my-2 rounded border border-green-400"
                    key={idx}
                  >
                    <h1>{method}</h1>
                  </div>
                ))}
              </div>
              <h4 className="font-semibold text-sm mt-4">SLOTS</h4>
              <div className="bg-gray-700 px-4 grid grid-cols-6">
                {appointment.slots.map((slot, idx) => (
                  <div key={idx}>
                    <div className="text-white font-semibold border-green-400 m-4 py-1 border text-center rounded">
                      <h1>{slot.start}</h1>
                    </div>
                  </div>
                ))}
              </div>
              <div className="flex justify-center mt-4">
                <button className="bg-green-600 text-white px-14 rounded py-1">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ListSlots;
