import { useState } from "react"
import SpecialityModal from "./SpecialityModal";

function DialogCustomAnimation() {
  const[showBtn, setShowBtn] = useState(false);

  const handleBtnClick = () => {
    setShowBtn(!showBtn);
  }

  return (
    <div className="h-[100vh]">
      <div className="flex justify-end">
        <button onClick={handleBtnClick} className="bg-blue-600 m-6 text-white font-semibold px-4 py-1 rounded-[5px]">Add Speciality</button>
      </div>
      <div>
        {showBtn && <SpecialityModal isOpen={true} onClose={() => {setShowBtn(false)}}/>}
      </div>
      <div>
        {}
      </div>
    </div>
  )
}

export default DialogCustomAnimation
