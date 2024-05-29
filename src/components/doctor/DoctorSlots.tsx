import AddSlotModal from "../modal/DoctorAddSlotModal";
import { useState } from "react";
import DatePicker from "../Slots/DateListing";

const DoctorSlots = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      {showModal ? (
        <AddSlotModal
          show={showModal}
          date=""
          // handleClose={() => setShowModal(false)}
        />
      ) : (
        <div className="w-[84vw] h-[150vh] bg-gray-700 flex justify-center items-center">
          <div className="bg-gray-800 w-[82vw] h-[146vh]">
            <div className="flex justify-end m-6">
              <button
                onClick={() => setShowModal(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded-[3px]"
              >
                Add Doctor Slot
              </button>
            </div>
            <DatePicker/>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorSlots;
