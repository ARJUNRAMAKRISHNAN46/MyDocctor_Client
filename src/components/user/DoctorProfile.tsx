import { useEffect, useState } from "react";
// import { GiGraduateCap } from "react-icons/gi";
// import { IoHome } from "react-icons/io5";
// import { MdOutlineHealthAndSafety } from "react-icons/md";
// import { VscSymbolMethod } from "react-icons/vsc";
import { findDoctorById } from "../../redux/actions/DoctorActions";
import { AppDispatch } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { UserData } from "../../types/userData";
import { FaStar } from "react-icons/fa6";

const consultationMethods = [
  "In-person Consultancy",
  "Phone Consultancy",
  "Video Consultancy",
];

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
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, []);

  const handleNavigate = (doctor_id: any) => {
    navigate(`/select-slot/${doctor_id}`);
  };
  return (
    <div>
      <div
        className="h-72 "
        style={{
          backgroundImage: `url("../../../src/assets/banners/banner.jpg")`,
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

//   <div className="mt-4 p-2 md:p-0">
//     <div className="bg-blue-400 md:mx-36 md:h-52 h-40 flex">
//       <div className="md:w-52 w-40 md:h-52 h-40 object-cover">
//         <img
//           className="md:w-52 w-40 md:h-52 h-40 object-cover"
//           src={`${doctor?.profilePhoto}`}
//           alt=""
//         />
//       </div>
//       <div className="md:ml-20 ml-3 mt-4 md:pt-6">
//         <h1 className="text-white font-bold md:text-[35px] text-[20px]">
//           Dr.{doctor?.name}
//         </h1>
//         <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
//           {doctor?.expertise?.toLocaleUpperCase()}
//         </h1>
//         <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
//           {doctor?.email}
//         </h1>
//         <h1 className="text-white font-semibold md:text-[20px] text-[14px]">
//           {doctor?.yearsOfExperience} Years of Exp.
//         </h1>
//       </div>
//     </div>
//     <div className="md:mt-10">
//       <div className="md:px-36">
//         <h1 className="font-semibold underline md:text-[20px]">ABOUT</h1>
//         <p className="font-thin mt-2">
//           Lorem Ipsum is simply dummy text of the printing and typesetting
//           industry. Lorem Ipsum has been the industry's standard dummy text
//           ever since the 1500s, when an unknown printer took a galley of type
//           and scrambled it to make a type specimen book. It has survived not
//           only five centuries, but also the leap into electronic typesetting,
//           remaining essentially unchanged. It was popularised in the 1960s
//           with the release of Letraset sheets containing Lorem Ipsum passages,
//           and more recently with desktop publishing software like Aldus
//           PageMaker including versions of Lorem Ipsum.
//         </p>
//       </div>
//     </div>
//     <div className="md:px-36 md:my-4">
//       <div>
//         <h1 className="underline md:text-[20px]">Education</h1>
//         <div className="my-4 flex">
//           <GiGraduateCap className="text-3xl" />
//           <div>
//             <h1 className="ml-6 font-thin">
//               {doctor?.expertise?.toLocaleUpperCase()}
//             </h1>
//             <h1 className="ml-6 font-semibold text-gray-500">
//               {doctor?.education}
//             </h1>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h1 className="underline md:text-[20px]">Experience</h1>
//         <div className="my-4 flex">
//           <MdOutlineHealthAndSafety className="text-3xl" />
//           <div>
//             <h1 className="ml-6 font-thin">
//               {doctor?.expertise?.toLocaleUpperCase()}
//             </h1>
//             <h1 className="ml-6 font-thin">
//               {doctor?.currentWorkingHospital}
//             </h1>
//           </div>
//         </div>
//       </div>

//       <div>
//         <h1 className="underline md:text-[20px]">Address</h1>
//         <div className="my-4 flex">
//           <IoHome className="text-2xl" />
//           <div>
//             <h1 className="ml-6 font-thin">{doctor?.city}</h1>
//             <h1 className="ml-6 font-thin">{doctor?.state}</h1>
//             <h1 className="ml-6 font-thin">{doctor?.country}</h1>
//           </div>
//         </div>
//       </div>
//       <div>
//         <h1 className="underline md:text-[20px]">Methods</h1>
//         <div className="my-4 flex">
//           <VscSymbolMethod className="text-3xl" />
//           <div>
//             {consultationMethods.map((method: string) => (
//               <h1 className="ml-6 font-thin">{method}</h1>
//             ))}
//           </div>
//         </div>
//       </div>
//       <div className="flex justify-center">
//         <button
//           onClick={() => handleNavigate(String(doctor?._id))}
//           className="bg-red-500 px-4 py-1 text-white rounded-[5px]"
//         >
//           Select a Date
//         </button>
//       </div>
//     </div>
//   </div>
