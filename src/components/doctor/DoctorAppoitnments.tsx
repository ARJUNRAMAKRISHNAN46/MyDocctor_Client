// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../../redux/store";
// import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
// import { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function DoctorAppointments() {
//   const [slots, setSlots] = useState([]);
//   const dispatch: AppDispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.authData.user);
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;
//   const navigate = useNavigate();

//   useEffect(() => {
//     dispatch(listDoctorAppoinments(userData?._id)).then((res) => {
//       setSlots(res.payload?.data);
//     });
//   }, [dispatch, userData?._id]);

//   const listAppointmentsWithUserId = (appointments: any) => {
//     const result: any = [];

//     appointments.forEach((appointment: any) => {
//       appointment.slots.forEach((slot: any) => {
//         if (slot.userId) {
//           result.push({
//             appointmentId: appointment._id,
//             name: slot.userId.name,
//             userId: slot.userId?._id,
//             date: appointment.date,
//             time: slot.start,
//             slotId: `appointment${slot._id?.slice(15)}`,
//           });
//         }
//       });
//     });

//     return result;
//   };

//   const filteredAppointments = listAppointmentsWithUserId(slots);
//   console.log("🚀 ~ DoctorAppointments ~ filteredAppointments:", filteredAppointments)

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentSlots = filteredAppointments.slice(
//     indexOfFirstItem,
//     indexOfLastItem
//   );

//   const totalPages = Math.ceil(filteredAppointments.length / itemsPerPage);

//   const handlePageChange = (pageNumber: number) => {
//     setCurrentPage(pageNumber);
//   };

//   const viewUsers = (slotId: string, userId: string) => {
//     navigate(`/doctor/show-patient/${slotId}?userId=${userId}`);
//   };

//   return (
//     <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
//       <div className="bg-gray-800 w-[82vw] h-[96vh]">
//         <h1 className="font-bold text-[30px] text-white px-5">Appointments</h1>
//         <div className="w-[82vw] overflow-x-scroll">
//           <div className="flex mt-4 justify-center">
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[60px]">
//               Sl.No
//             </h1>
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
//               Appointment ID
//             </h1>
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
//               User Name
//             </h1>
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[100px]">
//               Date
//             </h1>
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
//               Time
//             </h1>
//             <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
//               Action
//             </h1>
//           </div>
//           <div className="flex justify-center">
//             <div className="h-[65vh]">
//               {currentSlots.map((appointment: any, index: number) => (
//                 <div className="flex" key={appointment._id}>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[60px]">
//                     {(currentPage - 1) * itemsPerPage + index + 1}
//                   </div>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
//                     {appointment.slotId}
//                   </div>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
//                     {appointment.name}
//                   </div>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[100px]">
//                     {appointment.date}
//                   </div>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
//                     {appointment.time}
//                   </div>
//                   <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
//                     <button
//                       onClick={() => viewUsers(appointment.slotId, appointment?.userId)}
//                       className="bg-blue-500 text-white px-8 py-0.5 rounded"
//                     >
//                       View
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//         <div className="flex justify-center mt-4">
//           <button
//             disabled={currentPage === 1}
//             onClick={() => handlePageChange(currentPage - 1)}
//             className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
//           >
//             Previous
//           </button>
//           {[...Array(totalPages)].map((_, index) => (
//             <button
//               key={index}
//               onClick={() => handlePageChange(index + 1)}
//               className={`px-3 py-1 mx-1 ${
//                 currentPage === index + 1 ? "bg-gray-500" : "bg-gray-600"
//               } text-white rounded`}
//             >
//               {index + 1}
//             </button>
//           ))}
//           <button
//             disabled={currentPage === totalPages}
//             onClick={() => handlePageChange(currentPage + 1)}
//             className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default DoctorAppointments;

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Slot {
  start: string;
  end: string;
  status: "available" | "booked";
  _id: string;
}

interface ConsultationData {
  consultationMethods: string[];
  date: string;
  doctorId: string;
  slots: Slot[];
  __v: number;
  _id: string;
}

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

  function convertDateFormat(dateStr: string): string {
    const [day, month, year] = dateStr.split("-");
    return `${year}-${month}-${day}`;
  }

  function sortDataByDate(dataArray: ConsultationData[]): ConsultationData[] {
    return dataArray.sort((a, b) => {
      const dateA = new Date(convertDateFormat(a.date));
      const dateB = new Date(convertDateFormat(b.date));
      return dateB.getTime() - dateA.getTime();
    });
  }

  const sortedData: ConsultationData[] = sortDataByDate(slots);

  console.log("sortedData: ", sortedData);

  const listAppointmentsWithUserId = (appointments: any) => {
    const result: any = [];

    appointments.forEach((appointment: any) => {
      appointment.slots.forEach((slot: any) => {
        if (slot.userId) {
          result.push({
            appointmentId: appointment._id,
            name: slot.userId.name,
            userId: slot.userId?._id,
            date: appointment.date,
            time: slot.start,
            slotId: slot?._id,
          });
        }
      });
    });

    return result;
  };

  const filteredAppointments = listAppointmentsWithUserId(slots);
  console.log(
    "🚀 ~ DoctorAppointments ~ filteredAppointments:",
    filteredAppointments
  );

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

  const viewUsers = (slotId: string, userId: string) => {
    navigate(`/doctor/show-patient/${slotId}?userId=${userId}`);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-[30px] text-white px-5">Appointments</h1>
        <div className="w-[82vw] overflow-x-scroll">
          <div className="flex mt-4 justify-center">
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[60px]">
              Sl.No
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[300px]">
              Appointment ID
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[300px]">
              User Name
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[100px]">
              Date
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[200px]">
              Time
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold w-[200px]">
              Action
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="h-[65vh]">
              {currentSlots.map((appointment: any, index: number) => (
                <div className="flex" key={appointment.slotId}>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[60px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                  appointment{appointment.slotId?.slice(15)}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {appointment.name}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[100px]">
                    {appointment.date}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    {appointment.time}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    <button
                      onClick={() =>
                        viewUsers(appointment.slotId, appointment?.userId)
                      }
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
