// import React, { useState, useEffect } from "react";
// import dayjs from "dayjs";
// import { listDoctorSlots } from "../../../redux/actions/AppointmentActions";
// import { AppDispatch, RootState } from "../../../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import ListSlots from "./ListSlots";

// const SlotListing: React.FC = () => {
//   const [currentStartDate, setCurrentStartDate] = useState(dayjs());
//   const [selectedDate, setSelectedDate] = useState<string | null>(null);
//   const dispatch: AppDispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.userData.user);
//   const [slots, setSlots] = useState([]);

//   const fetchSlots = async (formattedDate: string) => {
//     console.log(`Fetching slots for date: ${formattedDate}`);
//     try {
//       const response = await dispatch(
//         listDoctorSlots({ id: userData?._id, selectedDate: formattedDate })
//       ).unwrap();
//       setSlots(response.data);
//       console.log("~ DoctorListing ~ res : ", response);
//     } catch (error) {
//       console.error("Failed to fetch slots: ", error);
//     }
//   };

//   useEffect(() => {
//     const currentDateFormatted = dayjs().format("DD-MM-YYYY");
//     setSelectedDate(currentDateFormatted);
//     if (userData?._id) {
//       fetchSlots(currentDateFormatted);
//     }
//   }, [dispatch, userData]);

//   const generateDates = (startDate: dayjs.Dayjs, numDays: number) => {
//     return Array.from({ length: numDays }, (_, i) => ({
//       day: startDate.add(i, "day").format("ddd"),
//       date: startDate.add(i, "day").date(),
//       fullDate: startDate.add(i, "day").toDate(),
//       formattedDate: startDate.add(i, "day").format("DD-MM-YYYY"),
//     }));
//   };

//   const handlePrevClick = () => {
//     const newStartDate = currentStartDate.subtract(1, "day");
//     setCurrentStartDate(newStartDate);
//     const newSelectedDate = newStartDate.format("DD-MM-YYYY");
//     setSelectedDate(newSelectedDate);
//     fetchSlots(newSelectedDate);
//   };

//   const handleNextClick = () => {
//     const newStartDate = currentStartDate.add(1, "day");
//     setCurrentStartDate(newStartDate);
//     const newSelectedDate = newStartDate.format("DD-MM-YYYY");
//     setSelectedDate(newSelectedDate);
//     fetchSlots(newSelectedDate);
//   };

//   const handleDateClick = (formattedDate: string) => {
//     setSelectedDate(formattedDate);
//     fetchSlots(formattedDate);
//   };

//   const dates = generateDates(currentStartDate, 10);

//   return (
//     <div>
//       <div className="flex items-center justify-center p-4">
//         <button
//           className="bg-gray-500 px-4 text-white text-2xl py-3 mx-2"
//           onClick={handlePrevClick}
//         >
//           &lt;
//         </button>
//         <div className="flex overflow-x-auto">
//           {dates.map((d, index) => (
//             <div
//               key={index}
//               className={`flex flex-col items-center py-2 px-6 cursor-pointer ${
//                 selectedDate === d.formattedDate
//                   ? "text-blue-500"
//                   : "text-gray-400"
//               }`}
//               onClick={() => handleDateClick(d.formattedDate)}
//             >
//               <span>{d.day}</span>
//               <span
//                 className={`rounded-[5px] p-4 ${
//                   selectedDate === d.formattedDate
//                     ? "bg-blue-500 text-white"
//                     : ""
//                 }`}
//               >
//                 {d.date}
//               </span>
//             </div>
//           ))}
//         </div>
//         <button
//           className="bg-gray-500 px-4 text-white text-2xl py-3 mx-2"
//           onClick={handleNextClick}
//         >
//           &gt;
//         </button>
//       </div>
//       <div>
//         <ListSlots slots={slots} selectedDate={String(selectedDate)} />
//       </div>
//     </div>
//   );
// };

// export default SlotListing;
