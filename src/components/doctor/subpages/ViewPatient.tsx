import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { UserData } from "../../../types/userData";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorAppoinments } from "../../../redux/actions/AppointmentActions";

const ViewPatient = () => {
  let { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<UserData>();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [slots, setSlots] = useState([]);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    fetchUser();
    dispatch(listDoctorAppoinments(userData?._id)).then((res) => {
      setSlots(res.payload?.data);
    });
  }, [dispatch, userData?._id]);

  // const listAppointmentsWithUserId = (appointments: any) => {
  //   const result: any = [];

  //   appointments.forEach((appointment: any) => {
  //     appointment.slots.forEach((slot: any) => {
        
  //       if (slot.userId) {
  //         result.push({
  //           appointmentId: appointment._id,
  //           userId: slot.userId?._id,
  //           date: appointment.date,
  //           time: slot.start,
  //         });
  //       }
  //     });
  //   });

  //   return result;
  // };

  // const filteredAppointments = listAppointmentsWithUserId(slots);

  // function getAppointmentsByUserId(userId: string) {
  //   return filteredAppointments.filter(
  //     (appointment: any) => appointment.userId === userId
  //   );
  // }

  // const data = getAppointmentsByUserId(String(user?._id));

  const fetchUser = async () => {
    const response = await axios.get(
      `http://localhost:8080/auth/api/find-user/${id}`
    );
    setUser(response.data?.data);
  };

  const goToMessages = () => {
    navigate(`/doctor/messages`)
  }

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
            <h1 className="mt-2 text-gray-300">state: {user?.state || "not provided"}</h1>
            <h1 className="mt-2 text-gray-300">Country: {user?.country || "not provided"}</h1>
          </div>
          <div className="w-[50%]">
            <div className="flex">
              <h1 className="text-gray-300 font-semibold ">DATE</h1>
              <h1 className="text-gray-300 font-semibold ml-28">TIME</h1>
            </div>
            
            {data.map((slots: any) => (
              <div className="flex">
                <h1 className="">{slots?.date}</h1>
                <h1 className="ml-16">{slots?.time}</h1>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button onClick={goToMessages} className="bg-green-700 px-8 text-sm py-1 text-white rounded">
            GO TO MESSAGES
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewPatient;
