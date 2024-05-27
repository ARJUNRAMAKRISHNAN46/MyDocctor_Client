import { PiUsersThreeBold } from "react-icons/pi";
import { MdPhoneInTalk } from "react-icons/md";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { LuUser2 } from "react-icons/lu";

function DoctorDashboardHeader() {
  return (
    <div>
      <div className="grid grid-cols-4 px-4 pt-4">
        <div className="m-4 rounded-[10px] h-32 bg-gray-600 flex flex-col items-center justify-center">
          <div className="bg-gray-500 p-2.5 rounded-full">
            <PiUsersThreeBold className="text-white text-2xl" />
          </div>
          <h1 className="text-white text-xl ibold">2.4K</h1>
          <h1 className="text-center text-white font-thin">Patients</h1>
        </div>
        <div className="m-4 rounded-[10px] h-32 bg-gray-600 flex flex-col items-center justify-center">
          <div className="bg-gray-500 p-2.5 rounded-full">
            <MdPhoneInTalk className="text-white text-2xl" />
          </div>
          <h1 className="text-white text-semibold">2.4K</h1>
          <h1 className="text-center text-white font-thin">
            Phone Consultations
          </h1>
        </div>
        <div className="m-4 rounded-[10px] h-32 bg-gray-600 flex flex-col items-center justify-center">
          <div className="bg-gray-500 p-2.5 rounded-full">
            <HiOutlineVideoCamera className="text-white text-2xl" />
          </div>
          <h1 className="text-white text-xl fontd">2.4K</h1>
          <h1 className="text-center text-white font-thin">
            Video Consultations
          </h1>
        </div>
        <div className="m-4 rounded-[10px] h-32 bg-gray-600 flex flex-col items-center justify-center">
          <div className="bg-gray-500 p-2.5 rounded-full">
            <LuUser2 className="text-white text-2xl" />
          </div>
          <h1 className="text-white font-semibold">2.4K</h1>
          <h1 className="text-center text-white font-thin">
            In-person Consultancy
          </h1>
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboardHeader;
