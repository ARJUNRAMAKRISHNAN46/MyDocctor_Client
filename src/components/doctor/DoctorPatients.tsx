import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listUserForSideBar } from "../../redux/actions/AppointmentActions";
import { UserData } from "../../types/userData";

function DoctorPatients() {
  const [patients, setPatients] = useState([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listUserForSideBar(userData?._id)).then((res) => {
      setPatients(res.payload?.data);
    });
  }, [dispatch, userData?._id]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPatients = patients.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(patients.length / itemsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className="bg-gray-800 w-[82vw] h-[96vh]">
        <h1 className="font-bold text-[30px] text-white px-5">Payments</h1>
        <div className="w-[82vw] overflow-x-scroll">
          <div className="flex mt-4 justify-center">
            <div className="flex">
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[60px]">
                Sl.No
              </h1>
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
                Name
              </h1>
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[300px]">
                Email
              </h1>
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[100px]">
                Mobile
              </h1>
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
                Country
              </h1>
              <h1 className="text-center bg-gray-300 text-gray-700 py-3 font-bold  w-[200px]">
                State
              </h1>
            </div>
          </div>
          <div className="flex justify-center">
            <div className="h-[65vh]">
              {currentPatients.map((patient: UserData, index: number) => (
                <div className="flex" key={patient._id}>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[60px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {patient.name}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[300px]">
                    {patient.email}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[100px]">
                    {patient.mobileNumber}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                    {patient.country || "No location"}
                  </div>
                  <div className="border-b text-sm border-gray-600 text-center py-2.5 w-[200px]">
                  {patient.state || "No location"}
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

export default DoctorPatients;
