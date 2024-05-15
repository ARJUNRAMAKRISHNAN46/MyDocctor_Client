import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { blockUser, listDoctor } from "../../redux/actions/DoctorActions";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";

function AdminDoctors() {
  const [doctors, setDoctors] = useState<never[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listDoctor())
      .then((res) => {
        setDoctors(res.payload.data);
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, [dispatch]);

  const handleNavigate = (doctor_id: any) => {
    console.log("clicked", doctor_id);
    navigate(`/admin/verifyDoctor/${doctor_id}`);
  };

  const handleAction = (id: string) => {
    dispatch(blockUser(id))
      .then((res) => {
        console.log("🚀 ~ dispatch ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh]">
        <div className="flex items-center py-4">
          <h1 className="text-white font-bold">ADMIN</h1>
          <IoIosArrowForward className="text-xl text-white" />
          <h1 className="text-white font-bold">DOCTORS</h1>
        </div>
        <div className="flex">
          <div className="border w-[5%]  border-gray-500 text-center">
            <h1 className="text-white py-2 font-bold">Sl.No</h1>
          </div>
          <div className="border w-[23%] py-2 border-gray-500 text-center">
            <h1 className="text-white font-bold">Doctor Name</h1>
          </div>
          <div className="border w-[25%] py-2 border-gray-500 text-center">
            <h1 className="text-white font-bold">Doctor ID</h1>
          </div>
          <div className="border w-[27%] py-2 border-gray-500 text-center">
            <h1 className="text-white font-bold">Doctor Email</h1>
          </div>
          <div className="border w-[10%] py-2 border-gray-500 text-center">
            <h1 className="text-white font-bold">Action</h1>
          </div>
          <div className="border w-[10%] py-2 border-gray-500 text-center">
            <h1 className="text-white font-bold">View</h1>
          </div>
        </div>
        {doctors.map((data: any, index) => (
          <div className="flex">
            <div className="border w-[5%]  border-gray-500 text-center py-2">
              <h1 className="text-white">{index + 1}</h1>
            </div>
            <div className="border w-[23%] border-gray-500 text-center py-2">
              <h1 className="text-white">{data.name}</h1>
            </div>
            <div className="border w-[25%] border-gray-500 text-center py-2">
              <h1 className="text-white">{data._id}</h1>
            </div>
            <div className="border w-[27%] border-gray-500 text-center py-2">
              <h1 className="text-white">{data?.email}</h1>
            </div>
            <div className="border w-[10%] border-gray-500 text-center py-2">
              <button
                onClick={() => handleAction(data?._id)}
                className={`${data?.isActive === true ? "bg-green-600" : "bg-red-600"} text-white bg-blue-600 px-4 rounded-[5px]`}
                >
              {data?.isActive === true ? "Active" : "Blocked"}
              </button>
            </div>
            <div className="border w-[10%] border-gray-500 text-center py-2">
              <button
                onClick={() => handleNavigate(data?._id)}
                className="text-white bg-blue-600 px-6 rounded-[5px]"
              >
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminDoctors;
