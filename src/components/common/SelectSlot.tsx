import { useEffect, useState } from "react";
import { availableShift } from "../../util/SlotDatas";
import { useParams } from "react-router-dom";
import { review } from "./Reviews";
import { TiStarFullOutline } from "react-icons/ti";
import { HiOutlineStar } from "react-icons/hi";
import axios from "axios";

interface ConsultancyMethod {
  method: string;
  status: boolean;
}

function SelectSlot() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [consultancyMethods, setConsultancyMethods] =
    useState<ConsultancyMethod[]>();
  const [cType, setCType] = useState<string>("");
  let { doctorId } = useParams();
  const today = new Date().toISOString().split("T")[0];
  const [doctor, setDoctor] = useState()

  useEffect(() => {
    const doctorData = axios
      .get(``)
      .then((res) => {
        console.log("🚀 ~ doctorData ~ res:", res);
      })
      .catch((err) => {
        console.log("🚀 ~ doctorData ~ err:", err);
      });
  }, []);

  const availableDates = availableShift
    .filter((shift) => shift.date >= today)
    .slice(0, 3)
    .map((shift) => shift.date);

  const availableMethods =
    availableShift
      .find((shift) => shift.date === selectedDate)
      ?.shifts.map((shift) => shift.shift) || [];

  const availableShifts =
    availableShift
      .find((shift) => shift.date === selectedDate)
      ?.shifts.find((shift) => shift.shift === selectedMethod)?.slots || [];

  const availableTypes = availableShift.find(
    (shift) => shift.date === selectedDate
  )?.methods;

  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);
    setSelectedMethod("");
    setSelectedShift("");
    setConsultancyMethods([]);
  };

  const handleType = (type: string) => {
    setCType(type);
  };

  const handleMethodSelect = (method: string) => {
    setConsultancyMethods(availableTypes);
    setSelectedMethod(method);
    setSelectedShift("");
  };

  const handleShiftSelect = (shift: string) => {
    setSelectedShift(shift);
  };
  return (
    <div className="md:flex md:px-24 justify-between md:my-8">
      <div className="md:w-[20%] h-[500px]  shadow-2xl cursor-pointer  transition-all duration-200 rounded-[10px]">
        <div className="flex justify-center mt-6">
          <img src="../../../src/assets/feyz.jpeg" alt="" />
        </div>
        <div>
          {/* <h1 className="font-bold text-center mt-2 text-[14px] text-gray-700">
            {doctors[0].speciality.toUpperCase()}
          </h1>
          <h1 className="font-bold text-center text-red-500 text-[20px]">
            {doctors[0].doctorName.toUpperCase()}
          </h1>
          <h1 className="font-bold text-center text-gray-500 text-[14px]">
            {doctors[0].qualification}
          </h1> */}
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
        <div className="md:px-4 md:mt-4">
          <h1 className="font-bold text-gray-700 text-[15px]">ADDRESS</h1>
          <p className="font-semibold text-gray-500">
            Thazhath Veedu, Nadakkavu, <br />
            Kozhikode, Kerala
            <br /> PIN: 632424
          </p>
        </div>
      </div>
      <div className="md:w-[78%] h-[650px] bg-white rounded-[5px] shadow-2xl">
        <div className="h-8 bg-blue-900 flex items-center justify-center rounded-t-[5px] md:mb-4">
          <h1 className="text-white font-semibold text-[15px]">
            SELECT YOUR DATE AND SOUND
          </h1>
        </div>
        <div>
          <div className="flex justify-center">
            {availableDates.map((date, index) => (
              <div
                key={index}
                onClick={() => handleDateSelect(date)}
                className={`cursor-pointer ${
                  selectedDate === date
                    ? "bg-blue-900 text-white"
                    : "bg-violet-200 text-blue-900"
                } font-bold px-6 py-4 rounded-[5px] border border-blue-900 p-2 m-4`}
              >
                {date}
              </div>
            ))}
          </div>
        </div>
        {selectedDate && (
          <div className="mt-4">
            <div className="flex justify-center">
              {availableMethods.map((method, index) => (
                <div
                  key={index}
                  onClick={() => handleMethodSelect(method)}
                  className={` ${
                    selectedMethod === method
                      ? "bg-blue-900 text-white"
                      : "bg-violet-200 text-blue-900"
                  } font-bold px-6 py-2 rounded-[5px] border border-blue-900 m-4`}
                >
                  {method}
                </div>
              ))}
            </div>
          </div>
        )}
        {consultancyMethods && (
          <div className="mt-4">
            <div className="flex justify-center">
              {consultancyMethods.map((type, index) => (
                <div
                  key={index}
                  onClick={() => handleType(type.method)}
                  className={` ${
                    type.status === false
                      ? "bg-red-200 text-red-800 border-red-800"
                      : cType === type.method
                      ? "bg-blue-900 text-white"
                      : "bg-violet-200 text-blue-900 border-blue-800"
                  } font-bold px-6 py-2 rounded-[5px] border p-2 m-4`}
                >
                  {type.method}
                </div>
              ))}
            </div>
          </div>
        )}
        {selectedMethod && (
          <div className="mt-4">
            <div className="flex justify-center">
              <div className="grid grid-cols-4 ">
                {availableShifts.map((shift, index) => (
                  <div
                    key={index}
                    onClick={() => handleShiftSelect(shift.time)}
                    className={` ${
                      shift.status === "Booked"
                        ? "bg-red-200 text-red-800 border-red-800"
                        : selectedShift === shift.time
                        ? "bg-blue-900 text-white"
                        : "bg-green-200 text-green-900 border-green-800"
                    } font-bold px-4 py-1 rounded-[5px] border m-4`}
                  >
                    <h1 className="text-center">{shift.time}</h1>
                    <h1 className="text-center">{shift.status}</h1>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center">
          <button className="bg-blue-900 text-white px-10 py-2 rounded-[5px] mt-4 font-semibold text-[15px]">
            PROCEED
          </button>
        </div>
      </div>
    </div>
  );
}

export default SelectSlot;
