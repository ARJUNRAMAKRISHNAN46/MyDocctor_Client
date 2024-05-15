import { useEffect, useState } from "react";
import { availableShift } from "../../util/SlotDatas";
import { AppDispatch } from "../../redux/store";
import { useDispatch } from "react-redux";
import { getUser } from "../../redux/actions/AuthActions";
import { UserData } from "../../types/userData";
interface ConsultancyMethod {
  method: string;
  status: boolean;
}

function DoctorSlots() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedMethod, setSelectedMethod] = useState<string>("");
  const [selectedShift, setSelectedShift] = useState<string>("");
  const [consultancyMethods, setConsultancyMethods] =
    useState<ConsultancyMethod[]>();
  const [cType, setCType] = useState<string>("");
  const today = new Date().toISOString().split("T")[0];
  const [doctor, setDoctor] = useState<UserData>();
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser())
      .then((res) => {
        setDoctor(res.payload.data);
      })
  }, []);
  console.log(doctor?._id,"_id");
  

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
    availableShift.map((data) => {
      if (data.date === selectedDate) {
        data.methods.map((meth) => {
          if (meth.method === type) {
            meth.status = !meth.status;
          }
        });
      }
    });
  };

  const handleMethodSelect = (method: string) => {
    setConsultancyMethods(availableTypes);
    setSelectedMethod(method);
    setSelectedShift("");
  };

  const handleShiftSelect = (shift: string) => {
    setSelectedShift(shift);
    availableShift.map((data) => {
      if (data.date === selectedDate) {
        data.shifts.map((value) => {
          value.slots.map((time) => {
            if (time.time === shift) {
              time.status = !time.status;
            }
          });
        });
      }
    });
  };

  const handleSubmit = () => {
    console.log(availableShift);
  };

  return (
    <div className="w-[84vw] h-[100vh] bg-gray-700 flex justify-center items-center">
      <div className=" bg-gray-800 w-[82vw] h-[96vh] flex justify-center items-center">
        <div className="md:w-full h-[650px] bg-gray-800 rounded-[5px] shadow-2xl">
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
                        : "bg-violet-200 text-blue-900 border-blue-800"
                    } font-bold px-6 py-2 rounded-[5px] border p-2 m-4 flex items-center`}
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
                        shift.status === false
                          ? "bg-red-200 text-red-800 border-red-800"
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
            <button
              onClick={handleSubmit}
              className="bg-blue-900 text-white px-10 py-2 rounded-[5px] mt-4 font-semibold text-[15px]"
            >
              PROCEED
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorSlots;
