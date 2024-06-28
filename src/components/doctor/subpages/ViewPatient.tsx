import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserData } from "../../../types/userData";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  getSlotById,
  removeSlot,
} from "../../../redux/actions/AppointmentActions";
import { useLocation } from "react-router-dom";
import { cancellationMail } from "../../../redux/actions/NotificationActions";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ViewPatient = () => {
  const { id } = useParams();
  const query = useQuery();
  const userData = useSelector((state: RootState) => state.authData.user);
  const userId = query.get("userId");
  console.log("🚀 ~ ViewPatient ~ userId:", userId);
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
        dispatch(cancellationMail(data)).then((res) => {
          console.log("🚀 ~ dispatch ~ res:", res);
        });
        navigate("/doctor/appointments");
      }
    });
  };
  const data = {
    email: String(user?.email),
    message: "Appointment cancellation update",
    doctorName: String(userData?.name),
    date: String(date),
    time: String(time),
  };
  console.log("🚀 ~ ViewPatient ~ data:", data);

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
