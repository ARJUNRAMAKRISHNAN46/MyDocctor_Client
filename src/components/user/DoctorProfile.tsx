import { useEffect, useState } from "react";
import { findDoctorById } from "../../redux/actions/DoctorActions";
import { AppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserData } from "../../types/userData";
import { FaStar } from "react-icons/fa6";
import banner from "../../../src/assets/banners/banner.jpg";

const star = [1, 2, 3, 4, 5];

function DoctorProfile() {
  let { id } = useParams();
  console.log("🚀 ~ ProfileOnUserSide ~ id:", id);

  const [doctor, setDoctor] = useState<UserData>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findDoctorById(String(id)))
      .then((res) => {
        setDoctor(res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, []);

  const handleNavigate = (doctor_id: any) => {
    navigate(`/select-slot/${doctor_id}`);
  };
  return (
    <div className="bg-white">
      <div
        className="h-72 "
        style={{
          backgroundImage: `url(${banner})`,
        }}
      >
        <div className="w-full h-full bg-blue-950 opacity-80 flex items-center justify-start">
          <div className="flex">
            <img
              className="md:w-52 ml-20 w-40 md:h-52 h-40 object-cover"
              src={`${doctor?.profilePhoto}`}
              alt=""
            />
            <div className="">
              <h1 className="text-white text-2xl font-bold ml-10">
                {doctor?.name}
              </h1>
              <h1 className="text-white text-xl mt-2 font-semibold ml-10">
                {doctor?.expertise?.toUpperCase()}
              </h1>
              <h1 className="text-white text mt-2 font-semibold ml-10">
                {doctor?.city?.toUpperCase() +
                  ", " +
                  doctor?.state?.toUpperCase()}
              </h1>
              <div className="flex ml-10 mt-4 items-center">
                {star.map((x) => (
                  <FaStar className="text-yellow-400 m-0.5" key={x} />
                ))}
                <h1 className="text-white">(2.5 K)</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="flex h-32 my-4 py-4 md:mx-20 md:px-10 justify-between">
          <div>
            <h1 className="font-bold text-sm underline">ADDRESS</h1>
            <h1 className="text-sm italic">{doctor?.city}</h1>
            <h1 className="text-sm italic">{doctor?.state}</h1>
            <h1 className="text-sm italic">{doctor?.country}</h1>
          </div>
          <div>
            <h1 className="font-bold text-sm underline">EMAIL</h1>
            <h1 className="text-sm italic">{doctor?.email}</h1>
          </div>
          <div>
            <h1 className="font-bold text-sm underline">MOBILE</h1>
            <h1 className="text-sm italic">{doctor?.mobileNumber}</h1>
          </div>
          <div>
            <h1 className="font-bold text-sm underline">CURRENT WORKING HOSPITAL</h1>
            <h1 className="text-sm italic">{doctor?.currentWorkingHospital}</h1>
          </div>
          <div>
            <h1 className="font-bold text-sm underline">MEDICAL LICENSE NUMBER</h1>
            <h1 className="text-sm italic">{doctor?.medicalLicenseNumber}</h1>
          </div>
          <div>
            <h1 className="font-bold text-sm underline">EXPERIENCE</h1>
            <h1 className="text-sm italic">{doctor?.yearsOfExperience} years</h1>
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={() => handleNavigate(doctor?._id)} className="bg-blue-700 px-10 py-2 hover:bg-blue-600 text-white text-sm font-semibold rounded-full">SELECT SLOT</button>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
