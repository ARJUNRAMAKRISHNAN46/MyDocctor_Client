import React, { useEffect, useState } from "react";
import { ListSlotsProps } from "../../../types/slotBooking";
import { removeSlot } from "../../../redux/actions/AppointmentActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import SlotSelector from "./SlotSelector";

const ListSlots: React.FC<ListSlotsProps> = ({ slots, selectedDate }) => {
  const [showSlot, setShowSlot] = useState<boolean>(false);
  const dispatch: AppDispatch = useDispatch();
  const [openSlot, setOpenSlot] = useState<boolean>(false);
  const [slot, setSlot] = useState("");

  const closeSlotAddModal = () => {
    setShowSlot(false);
  };

  useEffect(() => {
    setShowSlot(false);
  }, [selectedDate]);

  const openModal = () => {
    setShowSlot(true);
  };

  const cancelSlot = () => {
    console.log("🚀 ~ cancelSlot ~ slotId:", slot);
    dispatch(removeSlot(slot)).then((res) => {
      console.log("🚀 ~ dispatch ~ res:", res);
      setOpenSlot(false);
    });
  };

  const opeSlotModal = (slotId: string) => {
    setSlot(slotId);
    setOpenSlot(true);
  };

  const closeSlot = () => {
    setOpenSlot(false);
  };

  return (
    <div>
      {openSlot ? (
        <div className="flex justify-center items-centermt-32">
          <div className="w-80 text-white h-40 border">
            <h1 className="text-center">Are you sure ?</h1>
            <div className="px-10 flex justify-between">
              <button onClick={closeSlot} className="bg-green-500 px-4 py-1">
                Cancel
              </button>
              <button onClick={cancelSlot} className="bg-red-500 px-4 py-1">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>
          {slots.length === 0 ? (
            <div className="flex justify-center">
              {showSlot ? (
                <SlotSelector show={closeSlotAddModal} />
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
                  <h4 className="font-semibold text-sm mt-4">SLOTS</h4>
                  <div className="bg-gray-700 px-4 grid grid-cols-6">
                    {appointment.slots.map((slot, idx) => (
                      <div key={idx}>
                        <div className="m-4">
                          <div className="text-white font-semibold mb-1 border-green-400 py-1 border text-center rounded">
                            {slot.start}
                          </div>
                          {slot?.userId ? (
                            <h1>Booked</h1>
                          ) : (
                            <button
                              onClick={() => opeSlotModal(String(slot?._id))}
                              className="bg-red-500 text-white px-8 py-0.5"
                            >
                              cancel
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListSlots;
