import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { listDoctorSlots } from "../../../redux/actions/AppointmentActions";
import SlotList from "./SlotList";
import { useParams } from "react-router-dom";

function ListDate() {
    const { id } = useParams(); 
    const [currentStartDate, setCurrentStartDate] = useState(dayjs());
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const dispatch: AppDispatch = useDispatch();
    const userData = useSelector((state: RootState) => state.userData.user);
    const [slots, setSlots] = useState([]);
    
    useEffect(() => {
        const currentDateFormatted = dayjs().format("DD-MM-YYYY");
      setSelectedDate(currentDateFormatted);
      dispatch(
        listDoctorSlots({ id: String(id), selectedDate: currentDateFormatted })
      ).then((res) => {
        setSlots(res.payload?.data);
      });
    }, []);
  
    const generateDates = (startDate: dayjs.Dayjs, numDays: number) => {
      return Array.from({ length: numDays }, (_, i) => ({
        day: startDate.add(i, "day").format("ddd"),
        date: startDate.add(i, "day").date(),
        fullDate: startDate.add(i, "day").toDate(),
        formattedDate: startDate.add(i, "day").format("DD-MM-YYYY"),
      }));
    };
  
    const handlePrevClick = () => {
      setCurrentStartDate(currentStartDate.subtract(1, "day"));
    };
  
    const handleNextClick = () => {
      setCurrentStartDate(currentStartDate.add(1, "day"));
    };
  
    const handleDateClick = (formattedDate: string, fullDate: Date) => {
      dispatch(
        listDoctorSlots({ id: String(id), selectedDate: formattedDate })
      ).then((res) => {
        setSlots(res.payload?.data);
      });
      setSelectedDate(formattedDate);
      fetchSlots(formattedDate);
    };
  
    const fetchSlots = (formattedDate: string) => {
      console.log(`Fetching slots for date: ${formattedDate}`);
    };
  
    const dates = generateDates(currentStartDate, 8);
  
    return (
      <div className="bg-white">
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
                    ? "text-blue-500 font-semibold"
                    : "text-gray-800 font-semibold"
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
          <SlotList slots={slots} selectedDate={String(selectedDate)}/>
        </div>
      </div>
    );
  };

export default ListDate
