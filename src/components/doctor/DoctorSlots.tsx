import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useState } from "react";
import { DoctorAddSlotModal } from "../modal/DoctorAddSlotModal";
import { IoIosArrowForward } from "react-icons/io";

function DoctorSlots() {
  const userData = useSelector((state: RootState) => state.userData.user);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  console.log("user data", userData?.availableShifts, "");

  const openModal = () => {
    setModalOpen(!modalOpen);
  };

  return (
    <div className="w-[84vw] h-[150vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[146vh]">
        <div className="flex justify-between p-4">
          <div className="flex items-center">
            <h1 className="text-white font-bold">DOCTOR</h1>
            <IoIosArrowForward className="text-xl text-white" />
            <h1 className="text-white font-bold">SLOTS</h1>
          </div>
          <button
            onClick={openModal}
            className="bg-blue-700 text-white px-3 rounded-[5px] font-semibold py-1"
          >
            Add Slots
          </button>
        </div>
        <div>{modalOpen && <DoctorAddSlotModal close={openModal} />}</div>
      </div>
    </div>
  );
}

export default DoctorSlots;
