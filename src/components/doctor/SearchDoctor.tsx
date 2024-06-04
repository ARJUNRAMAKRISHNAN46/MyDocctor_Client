import React, { useState, ChangeEvent } from "react";
import axios from "axios";
import { RiSearchLine } from "react-icons/ri";

interface Doctor {
  _id: string;
  name: string;
}

const SearchDoctors: React.FC = () => {
  const [query, setQuery] = useState<string>("");
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  // const navigate = useNavigate();

  const handleSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (value.length > 1) {
      try {
        const response = await axios.get<Doctor[]>(
          `http://localhost:8080/doctor/api/search-doctors?q=${value}`
        );
        console.log("🚀 ~ handleSearch ~ response:", response.data?.data);
        setDoctors(response.data?.data);
      } catch (err) {
        console.error(err);
      }
    } else {
      setDoctors([]);
    }
  };

  const handleClick = async (name: string) => {
   
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
                onClick={() => handleClick(doctor.name)}
                key={doctor._id}
                className="px-4 py-2 text-gray-800 text-sm font-semibold hover:bg-gray-100 cursor-pointer"
              >
                {doctor.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SearchDoctors;
