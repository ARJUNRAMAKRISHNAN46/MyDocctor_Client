import React, { useState, ChangeEvent, useRef } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { IoArrowForwardSharp } from "react-icons/io5";

interface Doctor {
  _id: string;
  name: string;
  profilePhoto: string;
}

const SearchDoctors: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const navigate = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(async () => {
      if (value.length > 1) {
        try {
          const response: any = await axios.get<Doctor[]>(
            `https://mydocctor-server-7.onrender.com/api/doctor/search-doctors?q=${value}`
          );
          console.log("🚀 ~ handleSearch ~ response:", response.data?.data);
          setDoctors(response.data?.data);
        } catch (err) {
          console.error(err);
        }
      } else {
        setDoctors([]);
      }
    }, 300); // Adjust the delay as needed (300ms is commonly used)
  };

  const handleClick = async (id: string) => {
    navigate(`/view-doctor-profile/${id}`);
  };

  const goToDoctors = () => {
    navigate("/list-doctors");
  };

  return (
    <div className="md:ml-32 mt-10">
      <div className="flex">
        <input
          className="bg-white py-2 md:w-[500px] text-gray-700 border-2 rounded-l-full px-4 border-gray-300 outline-none"
          type="text"
          placeholder="Search doctors..."
          value={query}
          onChange={handleSearch}
        />
        <button className="flex justify-center items-center px-6 rounded-r-full text-white bg-blue-600">
          <RiSearchLine className="text-xl" />
        </button>
      </div>
      <div className="">
        {doctors.length > 0 && (
          <ul className="bg-white border border-gray-300 rounded-md mt-2 max-h-60 overflow-y-auto">
            {doctors.map((doctor) => (
              <li
                onClick={() => handleClick(String(doctor._id))}
                key={doctor._id}
                className="px-4 py-2 flex justify-between text-gray-800 text-sm font-semibold hover:bg-gray-100 cursor-pointer"
              >
                {doctor.name}
                <img className="w-4 h-4" src={doctor?.profilePhoto || "../../../src/assets/demoimage.jpg"} alt="" />
              </li>
            ))}
            <div onClick={goToDoctors} className=" text-gray-600 flex items-center justify-center border-t border-gray-300">
              <p>View all</p>
              <IoArrowForwardSharp />
            </div>
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchDoctors;
