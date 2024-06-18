import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorAppointments() {
  const [slots, setSlots] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listDoctorAppoinments(userData?._id)).then((res) => {
      setSlots(res.payload?.data);
    });
  }, [dispatch, userData?._id]);

  const listAppointmentsWithUserId = (appointments: any) => {
    const result: any = [];

    appointments.forEach((appointment: any) => {
      appointment.slots.forEach((slot: any) => {
        if (slot.userId) {
          result.push({
            appointmentId: appointment._id,
            userId: slot.userId,
            date: appointment.date,
            time: slot.start,
          });
        }
      });
    });

    return result;
  };

  const filteredAppointments = listAppointmentsWithUserId(slots);

  const viewUsers = (userId: string) => {
    console.log("🚀 ~ viewUsers ~ userId:", userId);
    navigate(`/doctor/show-patient/${userId}`);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-xl text-white">Appointments</h1>
        <div className="flex justify-center">
          <div>
            <div className="flex text-gray-300 text-sm mt-6">
              <div className="text-center italic border-2 border-gray-400 py-4 w-[50px]">
                <h1 className="font-bold">Sl.No</h1>
              </div>
              <div className="text-center italic border-2 border-gray-400 py-4 w-[300px]">
                <h1 className="font-bold">Appointment ID</h1>
              </div>
              <div className="text-center italic border-2 border-gray-400 py-4 w-[300px]">
                <h1 className="font-bold">User ID</h1>
              </div>
              <div className="text-center italic border-2 border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Date</h1>
              </div>
              <div className="text-center italic border-2 border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Time</h1>
              </div>
              <div className="text-center italic border-2 border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Action</h1>
              </div>
            </div>
            {filteredAppointments.map((appointment: any, id: string) => (
              <div
                className="flex text-gray-300 text-sm"
                key={appointment.appointmentId + id}
              >
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[50px]">
                  <h1 className="">{id + 1}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[300px]">
                  <h1 className="">{appointment.appointmentId}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[300px]">
                  <h1 className="">{appointment.userId}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[200px]">
                  <h1 className="">{appointment.date}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[200px]">
                  <h1 className="">{appointment.time}</h1>
                </div>
                <div className="text-center text-sm italic border border-gray-400 py-3 w-[200px]">
                  <button
                    onClick={() => viewUsers(appointment.userId)}
                    className="bg-blue-500 px-8 py-0.5 rounded"
                  >
                    View
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments;

//STARTUP CODE FOR DOCTOR APPOINTMENTS

// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store";
// import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
// import { useEffect, useState } from "react";
// import { AppointmentEntity } from "../../types/AddAppoinment";

// function DoctorAppoitnments() {
//   const [slots, setSlots] = useState([]);
//   const dispatch: AppDispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.userData.user);

//   useEffect(() => {
//     dispatch(listDoctorAppoinments(userData?._id)).then((res) => {
//       // console.log("🚀 ~ DoctorAppoitnments ~ res:", res);
//       setSlots(res.payload?.data);
//     });
//   }, [dispatch]);

//   const filteredAppointments = filterAppointmentsWithUserId(slots);

//   console.log("filteredAppointments: ",);

//   return (
//     <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
//       <div className=" bg-gray-800 w-[82vw] h-[96vh]">
//         <h1 className="font-bold text-xl text-white">Appointments</h1>
//         <div className="flex text-gray-300 text-sm">
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[50px]">
//             <h1 className="font-semibold">Sl.No</h1>
//           </div>
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[300px]">
//             <h1 className="font-semibold">Appoinment ID</h1>
//           </div>
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[200px]">
//             <h1 className="font-semibold">Date</h1>
//           </div>
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[200px]">
//             <h1 className="font-semibold">Time</h1>
//           </div>
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[300px]">
//             <h1 className="font-semibold">Doctor ID</h1>
//           </div>
//           <div className="text-center text-sm italic border border-gray-400 py-2 w-[200px]">
//             <h1 className="font-semibold">Action</h1>
//           </div>
//         </div>
//         {slots?.map((x, id) => (
//           <div className="flex text-gray-300 text-sm">
//             <div className="text-center text-sm italic border border-gray-400 py-2 w-[50px]">
//               <h1 className="">{id + 1}</h1>
//             </div>
//             <div className="text-center text-sm italic border border-gray-400 py-2 w-[300px]">
//               <h1 className="">{x?._id}</h1>
//             </div>
//             <div className="text-center text-sm italic border border-gray-400 py-2 w-[200px]">
//               <h1 className="">{x?.date}</h1>
//             </div>
//             <div className="text-center text-sm italic border border-gray-400 py-2 w-[200px]">
//               <h1 className="">{x?.date}</h1>
//             </div>
//             <div className="text-center text-sm italic border border-gray-400 py-2 w-[300px]">
//               <h1 className="">{x?.doctorId}</h1>
//             </div>
//             <div className="flex justify-center w-[200px] py-2 border border-gray-400">
//               <button className="bg-blue-700 px-4 rounded">View</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default DoctorAppoitnments;
