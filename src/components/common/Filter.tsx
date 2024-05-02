import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdCloseCircle } from "react-icons/io";

function Filter() {
  const [status, setStatus] = useState("hidden");

  const handleFilter = () => {
    setStatus((prevStatus) => (prevStatus === "hidden" ? "block" : "hidden"));
  };

  return (
    <div className="relative">
      {status === "hidden" ? (
        <div className="flex" onClick={handleFilter} >
          <GiHamburgerMenu className="text-2xl"/>
          <h1 className="font-bold text-xl">Filter</h1>
        </div>
      ) : (
        <IoMdCloseCircle className="text-2xl" onClick={handleFilter} />
      )}
      <div
        className={`w-72 bg-white border rounded-[8px] mt-4 p-2 pb-4 transition-transform transform absolute top-2 left-0 ${
          status === "hidden" ? "-translate-x-full" : "translate-x-0"
        }`}
      >
        <div className="flex justify-between">
          <h1 className="font-bold">Filter Doctors</h1>
        </div>
        <div className="bg-gray-100 w-full h-20 p-2 rounded-[5px]">
          <h1 className="font-semibold text-gray-600">Doctor Name</h1>
          <input
            className="w-full outline-none rounded-[5px] p-1"
            type="text"
            placeholder="Enter doctor name"
          />
        </div>
        <div className="bg-gray-100 w-full h-20 p-2 rounded-[5px] mt-4">
          <h1 className="font-semibold text-gray-600">Country</h1>
          <input
            className="w-full outline-none rounded-[5px] p-1"
            type="text"
            placeholder="Enter country name"
          />
        </div>
        <div className="bg-gray-100 w-full h-20 p-2 rounded-[5px] mt-4">
          <h1 className="font-semibold text-gray-600">Speciality</h1>
          <input
            className="w-full outline-none rounded-[5px] p-1"
            type="text"
            placeholder="Enter speciality"
          />
        </div>
        <div className="bg-gray-100 w-full h-20 p-2 rounded-[5px] mt-4">
          <h1 className="font-semibold text-gray-600">Sort with Name</h1>
          <div className="flex justify-between px-10 mt-2">
            <button className="bg-white text-[12px] px-4 py-1 font-semibold text-gray-600">
              A - Z
            </button>
            <button className="bg-white text-[12px] px-4 py-1 font-semibold text-gray-600">
              Z - A
            </button>
          </div>
        </div>
        <div className="bg-gray-100 w-full h-20 p-2 rounded-[5px] mt-4">
          <h1 className="font-semibold text-gray-600">Consultation Type</h1>
          <div className="flex justify-between px-2 mt-2">
            <button className="bg-white text-[12px] px-4 py-1 font-semibold text-gray-600">
              In-Person
            </button>
            <button className="bg-white text-[12px] px-4 py-1 font-semibold text-gray-600">
              Phone
            </button>
            <button className="bg-white text-[12px] px-4 py-1 font-semibold text-gray-600">
              Video Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Filter;
