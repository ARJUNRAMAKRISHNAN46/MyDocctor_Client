import { useEffect, useState } from "react";
import { listAllAppoinments } from "../../redux/actions/AppointmentActions";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useNavigate } from "react-router-dom";

function AdminBookings() {
  const [appointments, setAppointments] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(listAllAppoinments()).then((res) => {
      const appointmentsData = res.payload?.data;

      if (appointmentsData) {
        const sortedAppointments = appointmentsData.sort((a: any, b: any) => {
          const dateA = new Date(a.date.split('-').reverse().join('-')).getTime(); ;
          const dateB = new Date(b.date.split('-').reverse().join('-')).getTime(); ;
          return dateB - dateA;
        });

        setAppointments(sortedAppointments);
      }
    });
  }, [dispatch]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAppointments = appointments.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(appointments.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const viewUsers = (userId: string) => {
    navigate(`/doctor/show-patient/${userId}`);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-[30px] text-white px-5">Appointments</h1>
        <div className="w-[82vw] overflow-x-scroll">
          <div className="flex mt-4 justify-center">
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[60px]">
              Sl.No
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
              Appointment ID
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
              User Name
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
              Doctor Name
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[120px]">
              Date
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[150px]">
              Time
            </h1>
            <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[180px]">
              Action
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="h-[65vh]">
              {currentAppointments.map((appointment: any, index: number) => (
                <div className="flex" key={appointment._id}>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[60px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {`appointment_${appointment.appId.slice(14)}`}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    {appointment.userName}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    {appointment.doctorName}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[120px]">
                    {appointment.date}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[150px]">
                    {appointment.time}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[180px]">
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

export default AdminBookings;
