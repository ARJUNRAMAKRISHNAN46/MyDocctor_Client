import { useNavigate } from "react-router-dom";
import { UserData } from "../../types/userData";
import { useState } from "react";

interface Pagination {
  currentPage: number;
  pageSize: number;
}

function ListDoctors({ doctors }: { doctors: UserData[] }) {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10, // Change this to your desired page size
  });

  const viewProfile = (doctorId: string) => {
    navigate(`/view-doctor-profile/${doctorId}`);
  };

  const handlePageChange = (page: number) => {
    setPagination((prevPagination) => ({
      ...prevPagination,
      currentPage: page,
    }));
    navigate(`?page=${page}`);
  };

  return (
    <div>
      <div className="grid md:grid-cols-4 grid-cols-2 shadow-xl">
      {doctors.map((doctor: UserData) => (
          <div className="border-2 m-4 p-4 w-[280px]">
            <div className="flex justify-center py-6">
              <img
                className="w-[200px] h-[200px] object-cover image-fluid "
                src={doctor?.profilePhoto}
                alt=""
              />
            </div>
            <h1 className="font-semibold text-center">
              {doctor?.name.toUpperCase()}
            </h1>
            <h1 className="text-sm font-semibold text-red-500 text-center">
              {doctor?.expertise?.toUpperCase()}
            </h1>
            <h1 className="text-sm text-center">
              {doctor?.city && doctor?.city.toUpperCase()}
            </h1>
            <div>
              <button
                onClick={() => viewProfile(String(doctor?._id))}
                className="bg-blue-600 mt-4  text-white w-full py-1 rounded-[5px]"
              >
                View Profile
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="px-4 text-center bg-blue-500 mr-2 text-white flex items-center rounded">{pagination?.currentPage}</span>
        <button
          onClick={() => handlePageChange(pagination.currentPage + 1)}
          disabled={doctors.length < pagination.pageSize}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default ListDoctors;
