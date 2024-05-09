import axios from "axios";
import SpecialityModal from "../modal/SpecialityModal";
import { useEffect, useState } from "react";
import Card from "../common/Card";

function AdminSpecialities() {
  const [showBtn, setShowBtn] = useState(false);

  const handleBtnClick = () => {
    setShowBtn(!showBtn);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh]">
        <div className="flex justify-end">
          <button
            onClick={handleBtnClick}
            className="bg-blue-600 m-6 text-white font-semibold px-4 py-1 rounded-[5px]"
          >
            Add Speciality
          </button>
        </div>
        <div>
          {showBtn && (
            <SpecialityModal
              isOpen={true}
              onClose={() => {
                setShowBtn(false);
              }}
            />
          )}
        </div>
        {/* <div className="text-white">{doctors.map((data) => (
          <Card}/>
        ))}</div> */}
      </div>
    </div>
  );
}

export default AdminSpecialities;
