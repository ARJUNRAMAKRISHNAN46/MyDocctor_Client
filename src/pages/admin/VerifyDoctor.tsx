import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import {
  findDoctorById,
  verifyDoctor,
} from "../../redux/actions/DoctorActions";
import { UserData } from "../../types/userData";

function VerifyDoctor() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<UserData>();
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(findDoctorById(String(id)))
      .then((res) => {
        setDoctor(res.payload.data);
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, [dispatch]);

  const handleVerification = () => {
    dispatch(verifyDoctor(String(doctor?.email)))
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
        navigate("/admin/adminHome");
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  };

  return (
    <div className="md:flex md:px-24 justify-center md:my-8">
      <div className=" bg-white rounded-[5px] shadow-2xl p-20">
        <div className="bg-red-600">
          <h1 className="font-bold text-white text-center">DOCTOR PROFILE</h1>
        </div>
        <div className="flex justify-center my-4">
          <img className="rounded-full w-[300px] h-[300px]" src={doctor?.profilePhoto} alt="" />
        </div>
        <div className="flex">
          <h1 className="font-semibold">Doctor Name :</h1>
          <h1 className="font-semibold">{doctor?.name}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Doctor Email :</h1>
          <h1 className="font-semibold">{doctor?.email}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Mobile Number :</h1>
          <h1 className="font-semibold">{doctor?.mobileNumber}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Gender :</h1>
          <h1 className="font-semibold">{doctor?.gender}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">City :</h1>
          <h1 className="font-semibold">{doctor?.city}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">State :</h1>
          <h1 className="font-semibold">{doctor?.state}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Country :</h1>
          <h1 className="font-semibold">{doctor?.country}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Pincode :</h1>
          <h1 className="font-semibold">{doctor?.pincode}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Current Working Hospital : </h1>
          <h1 className="font-semibold">{doctor?.currentWorkingHospital}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Medical License Number : </h1>
          <h1 className="font-semibold">{doctor?.medicalLicenseNumber}</h1>
        </div>
        <div className="flex">
          <h1 className="font-semibold">Years of Experience : </h1>
          <h1 className="font-semibold">{doctor?.yearsOfExperience} years</h1>
        </div>
        <div className="">
          <h1 className="font-semibold">Medical License :</h1>
          <div className="border-2 border-red-500">
            <img src={doctor?.medicalLicense} alt="medicalLicense" />
          </div>
        </div>
        <div className="mt-2">
          <h1 className="font-semibold">Experience Certificate :</h1>
          <div className="border-2 border-red-500">
            <img
              src={doctor?.experienceCertificate}
              alt="experienceCertificate"
            />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            onClick={handleVerification}
            className={`${
              doctor?.isVerified ? "bg-green-800" : "bg-blue-800"
            } text-white font-semibold  px-10 mt-6 py-0.5 rounded-[5px]`}
          >
            {doctor?.isVerified ? "VERIFIED" : "VERIFY"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default VerifyDoctor;
