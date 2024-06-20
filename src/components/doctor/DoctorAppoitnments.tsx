import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DoctorAppointments() {
  const [slots, setSlots] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSlots = filteredAppointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const viewUsers = (userId: string) => {
    console.log("🚀 ~ viewUsers ~ userId:", userId);
    navigate(`/doctor/show-patient/${userId}`);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-[30px] text-white px-5">Payments</h1>
        <div className="w-[82vw] overflow-x-scroll">
          <div className="flex mt-4 justify-center">
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[60px]">
              Sl.No
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
              Appointment ID
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
              User ID
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[100px]">
              Date
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
              Time
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
              Action
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="h-[65vh]">
              {currentSlots.map((appointment: any, index: number) => (
                <div className="flex" key={appointment._id}>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[60px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {appointment.appointmentId}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {appointment.userId}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[100px]">
                    {appointment.date}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    {appointment.time}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    <button
                      onClick={() => viewUsers(appointment.userId)}
                      className="bg-blue-500 text-white px-8 py-0.5 rounded"
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              className={`px-3 py-1 mx-1 ${
                currentPage === index + 1 ? "bg-gray-500" : "bg-gray-600"
              } text-white rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default DoctorAppointments;

// <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
//   <div className=" bg-gray-800 w-[82vw] h-[96vh]">
//     <h1 className="font-bold text-xl text-white">Appointments</h1>
//     <div className="w-[1260px] overflow-scroll bg-green-400">
//         <div className="flex text-gray-300 text-sm mt-6">
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[50px]">
//             <h1 className="font-bold">Sl.No</h1>
//           </div>
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[300px]">
//             <h1 className="font-bold">Appointment ID</h1>
//           </div>
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[300px]">
//             <h1 className="font-bold">User ID</h1>
//           </div>
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[200px]">
//             <h1 className="font-bold">Date</h1>
//           </div>
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[200px]">
//             <h1 className="font-bold">Time</h1>
//           </div>
//           <div className="text-center text-gray-700 bg-gray-300 py-4 w-[200px]">
//             <h1 className="font-bold">Action</h1>
//           </div>
//         </div>
//         {currentSlots.map((appointment: any, id: string) => (
//           <div
//             className="flex text-gray-300 text-sm"
//             key={appointment.appointmentId + id}
//           >
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[50px]">
//               <h1 className="">{id + 1}</h1>
//             </div>
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[300px]">
//               <h1 className="">{appointment.appointmentId}</h1>
//             </div>
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[300px]">
//               <h1 className="">{appointment.userId}</h1>
//             </div>
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[200px]">
//               <h1 className="">{appointment.date}</h1>
//             </div>
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[200px]">
//               <h1 className="">{appointment.time}</h1>
//             </div>
//             <div className="text-center text-sm border-b border-gray-600 py-2.5 w-[200px]">
//               <button
//                 onClick={() => viewUsers(appointment.userId)}
//                 className="bg-blue-500 px-8 py-0.5 rounded"
//               >
//                 View
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex justify-center mt-4">
//       <button
//         disabled={currentPage === 1}
//         onClick={() => handlePageChange(currentPage - 1)}
//         className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
//       >
//         Previous
//       </button>
//       {[...Array(totalPages)].map((_, index) => (
//         <button
//           key={index}
//           onClick={() => handlePageChange(index + 1)}
//           className={`px-3 py-1 mx-1 ${
//             currentPage === index + 1 ? "bg-gray-500" : "bg-gray-600"
//           } text-white rounded`}
//         >
//           {index + 1}
//         </button>
//       ))}
//       <button
//         disabled={currentPage === totalPages}
//         onClick={() => handlePageChange(currentPage + 1)}
//         className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
//       >
//         Next
//       </button>
//     </div>
//   </div>
// </div>
