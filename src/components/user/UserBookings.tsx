import { useDispatch, useSelector } from "react-redux";
import { listUserAppoinments } from "../../redux/actions/AppointmentActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";

export default function UserBookings() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [slots, setSlots] = useState([]);

  useEffect(() => {
    dispatch(listUserAppoinments(userData?._id)).then((res) => {
      console.log("res.payload: ", res.payload?.data);
      setSlots(res.payload?.data);
    });
  }, [dispatch]);

  console.log(slots,"+++++++++soelots");
  
  return (
    <div className="bg-white h-[100vh] flex justify-center items-center">
      <div className="w-[82vw] h-[96vh]">
        <div className="flex justify-center">
          <div>
            <div className="flex text-gray-700 text-sm mt-6">
              <div className="text-center italic border-2 border-gray-500 py-4 w-[60px]">
                <h1 className="font-bold">Sl.No</h1>
              </div>
              <div className="text-center italic border-2 border-gray-500 py-4 w-[300px]">
                <h1 className="font-bold">Appointment ID</h1>
              </div>
              <div className="text-center italic border-2 border-gray-500 py-4 w-[300px]">
                <h1 className="font-bold">Doctor ID</h1>
              </div>
              <div className="text-center italic border-2 border-gray-500 py-4 w-[200px]">
                <h1 className="font-bold">Date</h1>
              </div>
              <div className="text-center italic border-2 border-gray-500 py-4 w-[200px]">
                <h1 className="font-bold">Time</h1>
              </div>
              {/* <div className="text-center italic border-2 border-gray-500 py-4 w-[200px]">
                <h1 className="font-bold">Action</h1>
              </div> */}
            </div>
            {slots.map((appointment: any, id: number) => (
              <div
                className="flex text-gray-700 text-sm"
                key={appointment.appointmentId + id}
              >
                <div className="text-center text-sm italic border border-gray-500 py-3 w-[60px]">
                  <h1 className="">{id + 1}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-500 py-3 w-[300px]">
                  <h1 className="">{appointment.appId}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-500 py-3 w-[300px]">
                  <h1 className="">{appointment.doctorId}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-500 py-3 w-[200px]">
                  <h1 className="">{appointment.date}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-500 py-3 w-[200px]">
                  <h1 className="">{appointment.time}</h1>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

            {/* <div className="text-center text-sm italic border border-gray-400 py-3 w-[200px]">
              <button
                onClick={() => viewUsers(appointment.userId)}
                className="bg-blue-500 px-8 py-0.5 rounded"
              >
                View
              </button>
            </div> */}