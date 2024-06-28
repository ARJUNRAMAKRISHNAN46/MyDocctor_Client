import { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { getPrescriptions } from "../../redux/actions/ChatActions";
import { ChatData } from "../../types/ChatTypes";

function UserPrescriptions() {
  const userData = useSelector((state: RootState) => state.authData.user);
  const dispatch: AppDispatch = useDispatch();
  const [prescriptions, setPrescriptions] = useState<ChatData[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getPrescriptions(userData?._id)).then((res) => {
      setPrescriptions(res.payload?.data)
    })
  }, [])

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPrescriptions = prescriptions?.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages = Math.ceil(prescriptions?.length / itemsPerPage);
  
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-white h-[100vh] px-4 curs">
      <h1 className="text-gray-800 font-semibold">Prescriptions</h1>
      <div className="grid grid-cols-4">
        {currentPrescriptions?.map((presc) => (
          <div className="py-2">
            <img className="w-48 h-48" src={presc?.message} alt={presc?.message} />
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
  );
}

export default UserPrescriptions;
