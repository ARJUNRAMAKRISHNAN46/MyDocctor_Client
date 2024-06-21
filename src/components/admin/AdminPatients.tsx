import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { listUsers } from "../../redux/actions/UserActions";
import { blockUser } from "../../redux/actions/DoctorActions";

function AdminPatients() {
  const [users, setUsers] = useState<never[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [status, setStatus] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    dispatch(listUsers()).then((res) => {
      setUsers(res.payload.data);
    });
  }, [dispatch, status]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleNavigate = (doctor_id: any) => {
    console.log("clicked", doctor_id);
    navigate(`/admin/verifyDoctor/${doctor_id}`);
  };

  const handleAction = (id: string) => {
    dispatch(blockUser(id)).then((res) => {
      if (res) setStatus(!status);
    });
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh]">
        <div className="flex items-center py-4">
          <h1 className="text-white font-bold">ADMIN</h1>
          <IoIosArrowForward className="text-xl text-white" />
          <h1 className="text-white font-bold">PATIENTS</h1>
        </div>
        <div className="overflow-x-scroll w-[82vw]">
          <div className="flex">
            <div className="border-y text-sm w-[60px]  border-gray-500 text-center">
              <h1 className="text-gray-200 py-2.5 font-bold">Sl.No</h1>
            </div>
            <div className="border-y text-sm w-[300px] py-2.5 border-gray-500 text-center">
              <h1 className="text-gray-200 font-bold">Doctor Name</h1>
            </div>
            <div className="border-y text-sm w-[300px] py-2.5 border-gray-500 text-center">
              <h1 className="text-gray-200 font-bold">Doctor ID</h1>
            </div>
            <div className="border-y text-sm w-[350px] py-2.5 border-gray-500 text-center">
              <h1 className="text-gray-200 font-bold">Doctor Email</h1>
            </div>
            <div className="border-y text-sm w-[150px] py-2.5 border-gray-500 text-center">
              <h1 className="text-gray-200 font-bold">Action</h1>
            </div>
            <div className="border-y text-sm w-[150px] py-2.5 border-gray-500 text-center">
              <h1 className="text-gray-200 font-bold">View</h1>
            </div>
          </div>
          {currentUsers.map((data: any, index) => (
            <div className="flex">
              <div className="border-b w-[60px] border-gray-500 text-sm text-gray-300 text-center py-2.5">
                <h1 className="">{index + 1}</h1>
              </div>
              <div className="border-b w-[300px] border-gray-500 text-sm text-gray-300 text-center py-2.5">
                <h1 className="">{data.name}</h1>
              </div>
              <div className="border-b w-[300px] border-gray-500 text-sm text-gray-300 text-center py-2.5">
                <h1 className="">{data._id}</h1>
              </div>
              <div className="border-b w-[350px] border-gray-500 text-sm text-gray-300 text-center py-2.5">
                <h1 className="">{data?.email}</h1>
              </div>
              <div className="border-b w-[150px] border-gray-500 text-sm text-gray-300 text-center py-2.5">
                <button
                  onClick={() => handleAction(data?._id)}
                  className={`${
                    data?.isActive === true ? "bg-green-600" : "bg-red-600"
                  } text-white bg-blue-600 px-6 rounded-[5px]`}
                >
                  {data?.isActive === true ? "Active" : "Blocked"}
                </button>
              </div>
              <div className="border-b w-[150px] border-gray-500 text-sm text-center py-2.5">
                <button
                  onClick={() => handleNavigate(data?._id)}
                  className="text-white bg-blue-600 px-6 rounded-[5px]"
                >
                  View
                </button>
              </div>
            </div>
          ))}
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

export default AdminPatients;
