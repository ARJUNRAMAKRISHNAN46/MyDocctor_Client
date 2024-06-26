import { useDispatch, useSelector } from "react-redux";
import {
  cancelSlot,
  listUserAppoinments,
  refundToWallet,
} from "../../redux/actions/AppointmentActions";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { formatDate } from "../../utils/GetCurrentDateAndTIme";

export default function UserBookings() {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [slots, setSlots] = useState([]);
  const [status, setStatus] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listUserAppoinments(userData?._id)).then((res) => {
      console.log("res.payload: ", res.payload?.data);
      setSlots(res.payload?.data);
    });
  }, [dispatch, status]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSlots = slots?.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(slots?.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const refundData = {
    userId: String(userData?._id),
    amount: "400",
    date: formatDate(new Date()),
    reason: "refund for appointment cancellation",
  };

  const cancelAppointment = (appId: string) => {
    console.log("this is the appointment ID: ", appId);
    dispatch(cancelSlot(String(appId))).then((res) => {
      if (res) {
        setStatus(true);
      }
    });
    dispatch(refundToWallet(refundData)).then((res) => {
      if (res) {
        setStatus(true);
      }
    });
  };

  return (
    <div className="bg-white h-[100vh] flex justify-center items-center">
      <div className="w-[82vw] h-[96vh]">
        <div className="flex justify-center">
          <div>
            <div className="flex text-gray-700 text-sm mt-6">
              <div className="text-center border-y border-gray-400 py-4 w-[60px]">
                <h1 className="font-bold">Sl.No</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[300px]">
                <h1 className="font-bold">Appointment ID</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[300px]">
                <h1 className="font-bold">Doctor ID</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Date</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Time</h1>
              </div>
              <div className="text-center border-y border-gray-400 py-4 w-[200px]">
                <h1 className="font-bold">Action</h1>
              </div>
            </div>
            {currentSlots?.map((appointment: any, id: number) => (
              <div
                className="flex text-gray-700 text-sm"
                key={appointment.appointmentId + id}
              >
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[60px]">
                  <h1 className="">
                    {(currentPage - 1) * itemsPerPage + id + 1}
                  </h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[300px]">
                  <h1 className="">{appointment.appId}</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[300px]">
                  <h1 className="">{appointment.doctorId}</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                  <h1 className="">{appointment.date}</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                  <h1 className="">{appointment.time}</h1>
                </div>
                <div className="text-center text-sm border-b border-gray-300 py-3 w-[200px]">
                  <button
                    onClick={() => cancelAppointment(appointment.appId)}
                    className="bg-red-600 rounded text-white px-6 py-0.5"
                  >
                    cancel
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mt-4">
              <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-3 py-1 mx-1 bg-gray-600 text-white rounded disabled:opacity-50"
              >
                Previous
              </button>
              {[...Array(totalPages)]?.map((_, index) => (
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
      </div>
    </div>
  );
}

{
  /* <div className="text-center text-sm italic border border-gray-400 py-3 w-[200px]">
              <button
                onClick={() => viewUsers(appointment.userId)}
                className="bg-blue-500 px-8 py-0.5 rounded"
              >
                View
              </button>
            </div> */
}
