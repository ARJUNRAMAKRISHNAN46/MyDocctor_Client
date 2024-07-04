import { useNavigate } from "react-router-dom";
import { UserData } from "../../types/userData";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

interface Pagination {
  currentPage: number;
  pageSize: number;
}

interface Filters {
  name: string;
  country: string;
  expertise: string;
  sort: string;
  consultationType: string[]; 
}

function ListDoctors({ doctors }: { doctors: UserData[] }) {
  const navigate = useNavigate();
  const [show, setShow] = useState<boolean>(false);
  const [pagination, setPagination] = useState<Pagination>({
    currentPage: 1,
    pageSize: 10,
  });
  const [filters, setFilters] = useState<Filters>({
    name: "",
    country: "",
    expertise: "",
    sort: "",
    consultationType: [],
  });

  const handleFilterChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFilters({
        ...filters,
        consultationType: checked
          ? [...filters.consultationType, value]
          : filters.consultationType.filter((type) => type !== value),
      });
    } else {
      setFilters({ ...filters, [name]: value });
    }
  };

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

  const openDropDown = () => {
    setShow(!show);
  };

  return (
    <div className="">
      <div className="block md:hidden">
        <div className="flex items-center bg-gray-300">
          <GiHamburgerMenu onClick={openDropDown} className="text-4xl" />
          <h1>FILTER DOCTOR</h1>
        </div>
        {show ? (
          <div className="filter-section h-80 shadow-xl hidden md:block">
            <h3>Filter Doctors</h3>
            <input
              name="name"
              placeholder="Enter doctor name"
              onChange={handleFilterChange}
            />
            <input
              name="country"
              placeholder="Enter country name"
              onChange={handleFilterChange}
            />
            <input
              name="expertise"
              placeholder="Enter speciality"
              onChange={handleFilterChange}
            />
            <div className="sort-section">
              <label>Sort with Name:</label>
              <button
                name="sort"
                value="A-Z"
                onClick={() => setFilters({ ...filters, sort: "A-Z" })}
              >
                A - Z
              </button>
              <button
                name="sort"
                value="Z-A"
                onClick={() => setFilters({ ...filters, sort: "Z-A" })}
              >
                Z - A
              </button>
            </div>
          </div>
        ) : ""}
      </div>
      <div className="grid md:grid-cols-4 grid-cols-2 shadow-xl md:min-w-[1100px]">
        {doctors.length === 0 ? (
          <div className="md:w-[1120px] flex justify-center items-center h-96">
            <h1 className="text-red-400 text-xl font-semibold">
              No Doctor Found
            </h1>
          </div>
        ) : (
          doctors.map((doctor: UserData) => (
            <div
              key={doctor._id}
              className="border-2 md:m-4 m-1 md:p-4 md:w-[280px]"
            >
              <div className="flex justify-center py-6">
                <img
                  className="md:w-[200px] w-36 h-36 md:h-[200px] object-cover image-fluid"
                  src={doctor.profilePhoto}
                  alt={doctor.name}
                />
              </div>
              <h1 className="font-semibold text-center">
                {doctor.name.toUpperCase()}
              </h1>
              <h1 className="text-sm font-semibold text-red-500 text-center">
                {doctor.expertise?.toUpperCase()}
              </h1>
              <h1 className="text-sm text-center">
                {doctor.city && doctor.city.toUpperCase()}
              </h1>
              <div>
                <button
                  onClick={() => viewProfile(String(doctor._id))}
                  className="bg-blue-600 mt-4 text-white w-full py-1 rounded-[5px]"
                >
                  View Profile
                </button>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="flex justify-center my-4">
        <button
          onClick={() => handlePageChange(pagination.currentPage - 1)}
          disabled={pagination.currentPage === 1}
          className="mr-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Previous
        </button>
        <span className="px-4 text-center bg-blue-500 mr-2 text-white flex items-center rounded">
          {pagination.currentPage}
        </span>
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
