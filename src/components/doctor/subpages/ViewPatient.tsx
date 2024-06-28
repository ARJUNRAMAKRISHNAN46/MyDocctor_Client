import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserData } from "../../../types/userData";
import { AppDispatch } from "../../../redux/store";
import { useDispatch } from "react-redux";
import {
  getSlotById,
  removeSlot,
} from "../../../redux/actions/AppointmentActions";
import { useLocation } from "react-router-dom";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ViewPatient = () => {
  const { id } = useParams();
  console.log("🚀 ~ ViewPatient ~ id:", id);
  const query = useQuery();
  const userId = query.get("userId");
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData>();
  const [time, setTime] = useState();
  const [date, setDate] = useState();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getSlotById(String(id))).then((res) => {
      setDate(res.payload?.data?.date);
      setTime(res.payload?.data?.slots[0]?.start);
    });
    fetchUser();
  }, [dispatch]);

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/auth/api/find-user/${userId}`
    );
    setUser(response.data?.data);
  };

  const goToMessages = () => {
    navigate(`/doctor/messages`);
  };

  const cancelSlot = () => {
    dispatch(removeSlot(String(id))).then((res) => {
      if (res) {
        navigate("/doctor/appointments");
      }
    });
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh]">
        <div className="bg-blue-700 h-36 pl-20 pt-16">
          <img
            className="w-36 h-36 rounded-full"
            src={user?.profilePhoto || "../../../../src/assets/demoimage.jpg"}
            alt="profilePhoto"
          />
        </div>
        <div className="h-96 p-20 flex">
          <div className="w-[50%]">
            <h1 className="mt-2 text-gray-300">Name: {user?.name}</h1>
            <h1 className="mt-2 text-gray-300">Email: {user?.email}</h1>
            <h1 className="mt-2 text-gray-300">
              Mobile Number: {user?.mobileNumber || "not provided"}
            </h1>
            <h1 className="mt-2 text-gray-300">
              state: {user?.state || "not provided"}
            </h1>
            <h1 className="mt-2 text-gray-300">
              Country: {user?.country || "not provided"}
            </h1>
          </div>
          <div className="w-[50%]">
            <div className="flex">
              <h1 className="text-gray-300 font-semibold ">DATE</h1>
              <h1 className="text-gray-300 font-semibold ml-28">TIME</h1>
            </div>

            <div className="flex">
              <h1 className="">{date}</h1>
              <h1 className="ml-16">{time}</h1>
            </div>
          </div>
        </div>
        <div className="flex justify-between px-32 ">
          <button
            onClick={goToMessages}
            className="bg-green-600 px-8 text-sm py-1 text-white rounded"
          >
            GO TO MESSAGES
          </button>
          <button
            onClick={cancelSlot}
            className="bg-red-600 text-white px-6 text-sm py-1 rounded"
          >
            Cancel Slot
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
