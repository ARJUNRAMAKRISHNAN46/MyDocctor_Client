import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import { listDoctorSlots } from "../../../redux/actions/AppointmentActions";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import ListSlots from "./ListSlots";

const DatePicker: React.FC = () => {
  const [currentStartDate, setCurrentStartDate] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [slots, setSlots] = useState([]);
  const [refresh, setRefresh] = useState<boolean>(false);

  useEffect(() => {
    const currentDateFormatted = dayjs().format("YYYY-MM-DD");
    setSelectedDate(currentDateFormatted);
    dispatch(
      listDoctorSlots({ id: userData?._id, selectedDate: currentDateFormatted })
    ).then((res) => {
      setSlots(res.payload?.data);
    });
  }, [refresh]);

  const generateDates = (startDate: dayjs.Dayjs, numDays: number) => {
    return Array.from({ length: numDays }, (_, i) => ({
      day: startDate.add(i, "day").format("ddd"),
      date: startDate.add(i, "day").date(),
      fullDate: startDate.add(i, "day").toDate(),
      formattedDate: startDate.add(i, "day").format("YYYY-MM-DD"),
    }));
  };

  const renderPage = () => {
    setRefresh(!refresh);
  }

  const handlePrevClick = () => {
    setCurrentStartDate(currentStartDate.subtract(1, "day"));
  };

  const handleNextClick = () => {
    setCurrentStartDate(currentStartDate.add(1, "day"));
  };

  const handleDateClick = (formattedDate: string, fullDate: Date) => {
    console.log("🚀 ~ handleDateClick ~ fullDate:", fullDate)
    dispatch(
      listDoctorSlots({ id: userData?._id, selectedDate: formattedDate })
    ).then((res) => {
      setSlots(res.payload?.data);
    });
    setSelectedDate(formattedDate);
    fetchSlots(formattedDate);
  };

  const fetchSlots = (formattedDate: string) => {
    console.log(`Fetching slots for date: ${formattedDate}`);
  };

  const dates = generateDates(currentStartDate, 10);

  return (
    <div>
      <div className="flex items-center justify-center p-4">
        <button
          className="bg-gray-500 px-4 text-white text-2xl py-3 mx-2"
          onClick={handlePrevClick}
        >
          &lt;
        </button>
        <div className="flex overflow-x-auto">
          {dates.map((d, index) => (
            <div
              key={index}
              className={`flex flex-col items-center py-2 px-6 cursor-pointer ${
                selectedDate === d.formattedDate
                  ? "text-blue-500"
                  : "text-gray-400"
              }`}
              onClick={() => handleDateClick(d.formattedDate, d.fullDate)}
            >
              <span>{d.day}</span>
              <span
                className={`rounded-[5px] p-4 ${
                  selectedDate === d.formattedDate
                    ? "bg-blue-500 text-white"
                    : ""
                }`}
              >
                {d.date}
              </span>
            </div>
          ))}
        </div>
        <button
          className="bg-gray-500 px-4 text-white text-2xl py-3 mx-2"
          onClick={handleNextClick}
        >
          &gt;
        </button>
      </div>
      <div>
        <ListSlots slots={slots} refresh={renderPage} selectedDate={String(selectedDate)}/>
      </div>
    </div>
  );
};

export default DatePicker;
