import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { review } from "./Reviews";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineStar } from "react-icons/hi";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { findDoctorById } from "../../redux/actions/DoctorActions";
import { UserData } from "../../types/userData";
import ListDate from "../user/slots/ListDate";

function SelectSlot() {
  let { id } = useParams();
  const [doctor, setDoctor] = useState<UserData>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(findDoctorById(String(id)))
      .then((res) => {
        setDoctor(res.payload.data);
        console.log("🚀 ~ dispatch ~ doctor ~ res:", res.payload.data);
      })
      .catch((err) => {
        console.log("🚀 ~ dispatch ~ err:", err);
      });
  }, []);

  return (
    <div className="md:flex md:px-24 justify-between md:my-8">
      <div className="md:w-[20%] h-[450px]  shadow-2xl cursor-pointer  transition-all duration-200 rounded-[10px]">
        <div className="flex justify-center mt-6 w-[230px] h-[230px] object-cover">
          <img src={doctor?.profilePhoto} alt="" />
        </div>
        <div>
          <h1 className="font-bold text-center mt-2 text-[18px] text-gray-700">
            {doctor?.name.toUpperCase()}
          </h1>
          <h1 className="font-bold text-center text-red-500 text-[14px]">
            {doctor?.expertise ? doctor?.expertise.toUpperCase() : ""}
          </h1>
          <h1 className="font-bold text-center text-gray-500 text-[14px]">
            {doctor?.qualification}
          </h1>
          <div className="flex items-center justify-center">
            {review[0].rating.map((rev, index) =>
              rev === 1 ? (
                <TiStarFullOutline key={index} className="text-yellow-500" />
              ) : (
                <HiOutlineStar key={index} className="text-yellow-500" />
              )
            )}
            <h1> (2.4 K)</h1>
          </div>
        </div>

        <div className="md:px-4 mt-4">
          <h1 className="font-bold text-gray-700 text-[15px]">
           WORKING
          </h1>
          <p className="text-sm font-semibold text-gray-600">
            {doctor?.currentWorkingHospital}
          </p>
        </div>
      </div>
      <div className="md:w-[78%]  bg-white rounded-[5px] shadow-2xl">
        <div className="h-8 bg-blue-600 flex items-center justify-center rounded-t-[5px] md:mb-4">
          <h1 className="text-white font-semibold text-[15px]">
            SELECT YOUR DATE AND SOUND
          </h1>
        </div>
        <div className="flex justify-center mt-10">
          <ListDate/>
        </div>
      </div>
    </div>
  );
}

export default SelectSlot;
