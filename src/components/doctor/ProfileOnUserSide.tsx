import { doctors } from "../common/ListDoctors";
import { GiGraduateCap } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { MdOutlineLanguage } from "react-icons/md";
import { FaRegClock } from "react-icons/fa";
import { VscSymbolMethod } from "react-icons/vsc";

function ProfileOnUserSide() {
  return (
    <div className="mt-4 p-2 md:p-0">
      <div className="bg-red-400 md:px-36 md:h-52 h-40 flex">
        <div className="md:w-52 w-40 md:h-52 h-40">
          <img src={`${doctors[0].profile}`} alt="" />
        </div>
        <div className="md:ml-20 ml-3 mt-4 md:pt-6">
          <h1 className="text-white font-bold md:text-[35px] text-[20px]">
            Dr.{doctors[0].doctorName}
          </h1>
          <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
            {doctors[0].qualification}
          </h1>
          <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
            {doctors[0].speciality}
          </h1>
          <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
            {doctors[0].experience} Years of Exp.
          </h1>
        </div>
      </div>
      <div className="md:mt-10">
        <div className="md:px-36">
          <h1 className="font-bold underline md:text-[20px]">ABOUT</h1>
          <p className="font-semibold mt-2">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>
      </div>
      <div className="md:px-36 md:my-4">
        <div>
          <h1 className="font-bold underline md:text-[20px]">Education</h1>
          <div className="my-4 flex">
            <GiGraduateCap className="text-3xl" />
            <div>
              <h1 className="ml-6 font-semibold">{doctors[0].qualification}</h1>
              <h1 className="ml-6 font-semibold text-gray-500">
                Kozhikode Medical Collage
              </h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold underline md:text-[20px]">Experience</h1>
          <div className="my-4 flex">
            <MdOutlineHealthAndSafety className="text-3xl" />
            <div>
              <h1 className="ml-6 font-semibold">Sr. Gynecologist</h1>
              <h1 className="ml-6 font-semibold text-gray-500">
                Aster MIMS Calicut
              </h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold underline md:text-[20px]">Language</h1>
          <div className="my-4 flex">
            <MdOutlineLanguage className="text-2xl" />
            <div>
              <h1 className="ml-6 font-semibold">Malayalam</h1>
              <h1 className="ml-6 font-semibold">English</h1>
              <h1 className="ml-6 font-semibold">Hindi</h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold underline md:text-[20px]">Working Shift</h1>
          <div className="my-4 flex">
            <FaRegClock className="text-2xl" />
            <div>
              <h1 className="ml-6 font-semibold">09:00AM - 12:00PM</h1>
              <h1 className="ml-6 font-semibold">02:00PM - 04:00PM</h1>
              <h1 className="ml-6 font-semibold">07:00PM - 09:00PM</h1>
            </div>
          </div>
        </div>
        <div>
          <h1 className="font-bold underline md:text-[20px]">Methods</h1>
          <div className="my-4 flex">
            <VscSymbolMethod className="text-3xl" />
            <div>
              <h1 className="ml-6 font-semibold">In-Person Consultancy</h1>
              <h1 className="ml-6 font-semibold">Phone Consultancy</h1>
              <h1 className="ml-6 font-semibold">Video Consultancy</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
            <button className="bg-red-500 px-4 py-1 text-white rounded-[5px]">Select a Date</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileOnUserSide;
