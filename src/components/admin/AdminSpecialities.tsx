import SpecialityModal from "../modal/SpecialityModal";
import { useEffect, useState } from "react";
import Card from "../common/Card";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { listSpeciality } from "../../redux/actions/UserActions";
import { AddSpeciality } from "../../types/userData";
import { IoIosArrowForward } from "react-icons/io";

function AdminSpecialities() {
  const [showBtn, setShowBtn] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [speciality, setSpeciality] = useState<AddSpeciality[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(listSpeciality()).then((res) => {
      setSpeciality(res.payload?.data);
    });
  }, [dispatch]);

  const handleBtnClick = () => {
    setShowBtn(!showBtn);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentSpeciality = speciality.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(speciality.length / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="w-[84vw] min-h-[150vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] min-h-[146vh]">
        <div className="flex justify-between">
          <div className="flex items-center py-4 ml-6">
            <h1 className="text-white font-bold">ADMIN</h1>
            <IoIosArrowForward className="text-xl text-white" />
            <h1 className="text-white font-bold">SPECIALITIES</h1>
          </div>
          <button
            onClick={handleBtnClick}
            className="bg-blue-600 m-6 text-white font-semibold px-4 py-1 rounded-[5px]"
          >
            Add Speciality
          </button>
        </div>
        <div>
          {showBtn && (
            <SpecialityModal
              isOpen={true}
              onClose={() => {
                setShowBtn(false);
              }}
            />
          )}
        </div>
        <div className="md:px-16 grid grid-cols-3">
          {currentSpeciality?.map((spec) => (
            <Card
              specialtyName={spec?.specialtyName}
              specialtyDescription={spec?.specialtyDescription}
              specialtyImage={spec?.specialtyImage}
              _id={spec?._id}
            />
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

export default AdminSpecialities;
