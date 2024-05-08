import SpecialityModal from "../modal/SpecialityModal";
import { useState } from "react";

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
      </div>
    </div>
    // <div className="h-[100vh] bg-gray-800 w-[83.5vw]">
    //   <div className="m-1">
    //     <div className="flex justify-end">
    //       <button
    //         onClick={handleBtnClick}
    //         className="bg-blue-600 m-6 text-white font-semibold px-4 py-1 rounded-[5px]"
    //       >
    //         Add Speciality
    //       </button>
    //     </div>
    //     <div>
    //       {showBtn && (
    //         <SpecialityModal
    //           isOpen={true}
    //           onClose={() => {
    //             setShowBtn(false);
    //           }}
    //         />
    //       )}
    //     </div>
    //     <div>{}</div>
    //   </div>
    // </div>
  );
}

export default AdminSpecialities;
