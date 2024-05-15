import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { listDoctor } from "../../redux/actions/DoctorActions";

function ListDoctors() {
  const [doctors, setDoctors] = useState<never[]>([]);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(listDoctor())
      .then((res) => {
        setDoctors(res.payload.data)
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, [dispatch]);

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
            <h1 className="text-[10px] text-center font-bold md:text-[15px]">
              Dr.{doctor?.name}
            </h1>
            <h1 className="text-[10px] text-center font-semibold md:text-[15px]">
              {`MBBS, MD`}
            </h1>
            <h1 className="text-[10px] text-center font-semibold md:text-[15px]">
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
