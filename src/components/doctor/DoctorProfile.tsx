import { IoIosArrowForward } from "react-icons/io";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { UserData } from "../../types/userData";

function DoctorProfile() {
  const userData: UserData = useSelector((state: RootState) => state.authData.user);
  return (
    <div className="w-[84vw] h-[150vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[146vh]">
        <div className="flex items-center p-2">
          <h1 className="text-white font-bold">DOCTOR</h1>
          <IoIosArrowForward className="text-xl text-white" />
          <h1 className="text-white font-bold">SLOTS</h1>
        </div>
        <div className="flex justify-center">
          <img className="w-[200px] h-[200px] rounded-full" src={userData?.profilePhoto} alt="" />
        </div>
        <div className="bg-gray-700 md:mx-20 mt-4 md:p-12 rounded-[10px] flex">
            <div>
              <h1 className="text-white font-semibold">Name : {userData?.name}</h1>
              <h1 className="text-white font-semibold">Email : {userData?.email}</h1>
              <h1 className="text-white font-semibold">Mobile Number : {userData?.mobileNumber}</h1>
              <h1 className="text-white font-semibold">Date of Birth : {userData?.dob}</h1>
              <h1 className="text-white font-semibold">Education : {userData?.education}</h1>
              <h1 className="text-white font-semibold">Expertise : {userData?.expertise}</h1>
              <h1 className="text-white font-semibold">Collage Name : {userData?.collegeName}</h1>
              <h1 className="text-white font-semibold">Current Working Hospital : {userData?.currentWorkingHospital}</h1>
            </div>
            <div className="flex ml-4">
              <img className="w-[200px] h-[200px] m-2" src={userData?.experienceCertificate} alt="experience certificate" />
              <img className="w-[200px] h-[200px] m-2" src={userData?.medicalLicense} alt="medical license" />
            </div>
        </div>
        <div className="flex mx-20">
          <div className="w-[50%] p-4 flex justify-end"><button className="text-white rounded-[4px] font-semibold px-4 py-1 bg-blue-700">Edit Profile</button></div>
          <div className="w-[50%] p-4 "><button className="text-white rounded-[4px] font-semibold px-4 py-1 bg-red-600">Edit Address</button></div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
