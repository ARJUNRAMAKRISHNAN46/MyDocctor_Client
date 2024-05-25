import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { useEffect, useState } from "react";
import { AddSpeciality } from "../../types/userData";
import { listSpeciality } from "../../redux/actions/UserActions";

function Speciality() {
  const dispatch: AppDispatch = useDispatch();
  const [speciality, setSpeciality] = useState<AddSpeciality[]>();

  useEffect(() => {
    dispatch(listSpeciality()).then((res) => {
      setSpeciality(res.payload?.data);
    });
  }, [dispatch]);
  
  const color = [
    "green",
    "red",
    "green",
    "blue"
  ]

  return (
    <div>
      <div className="mb-4">
        <h1 className="font-bold text-[10px] md:text-[24px] md:mb-2 ml-1 md:ml-6">
          Specialities
        </h1>
        <div className="md:flex grid grid-cols-1">
          {speciality?.map((spec,index) => (
          <div className="ml-[1.5%] border rounded-sm md:rounded-md h-[340px] md:h-[400px] bg-white w-[98vw] md:w-[23%] shadow-2xl pb-1">
            <div className={`bg-${color[index]}-500 h-[240px] border rounded-t-sm md:rounded-t-md md:h-64 transition-all duration-300 transform hover:scale-105 flex justify-center items-center`}>
              <img className="object-cover" src={spec?.specialtyImage} alt="" />
            </div>
            <h1 className="leading-none ml-1 text-[18px] mt-2 md:ml-8 md:mt-3 font-bold md:text-xl">
              {spec?.specialtyName}
            </h1>
            <h1 className="leading-none ml-1 text-[15px] mt-0.5 text-gray-800 md:ml-8 md:mt-1 md:text-[16px]">
              {spec?.specialtyDescription}
            </h1>
          </div>
          ))}

          
        </div>
      </div>
      <div className="flex justify-center md:mt-6 md:mb-6">
        <button className="bg-white shadow-2xl text-gray-600 md:text-xl font-semibold md:px-6 md:py-2 md:rounded-[5px] text-[6px] px-1 py-0.5 mb-1 border rounded-sm">
          Find More
        </button>
      </div>
    </div>
  );
}

export default Speciality;
