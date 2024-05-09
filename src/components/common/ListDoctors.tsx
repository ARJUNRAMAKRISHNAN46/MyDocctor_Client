import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ListDoctors() {
  const [doctors, setDoctors] = useState<never[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/doctor/api/doctors/list-doctors"
        );
        console.log("🚀 ~ doctors ~ res:", res);
        setDoctors(res.data);
      } catch (err) {
        console.log("🚀 ~ doctors ~ err:", err);
      }
    };

    fetchData();
  }, []);

  const viewProfile = (doctorId: string) => {
    navigate(`/select-slot/${doctorId}`);
  };

  return (
    <div>
      <div className="md:px-36 grid md:grid-cols-4 grid-cols-2 md:my-4">
        {doctors.map((doctor) => (
          <div className="p-3 md:w-[250px]">
            <img
              className="rounded-full"
              src={`${
                doctor?.profilePhoto
                  ? doctor?.profilePhoto
                  : "../../../src/assets/demoimage.png"
              }`}
              alt="doctor profile"
            />
            <h1 className="text-[12px] text-center font-bold md:text-[25px]">
              Dr.{doctor?.name}
            </h1>
            <h1 className="text-[12px] text-center font-semibold md:text-[20px]">
              {`MBBS, MD`}
            </h1>
            <h1 className="text-[12px] text-center font-semibold md:text-[20px]">
              {doctor?.expertise || "General"}
            </h1>
            <button
              onClick={() => viewProfile(doctor?._id)}
              className="bg-red-500 text-white w-full py-1 rounded-[5px]"
            >
              View Profile
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListDoctors;
