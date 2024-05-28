import { useEffect, useState } from "react";
import { AppointmentEntity } from "../../types/AddAppoinment";
import { useDispatch, useSelector } from "react-redux";
import { UserData } from "../../types/userData";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorSlots } from "../../redux/actions/AppointmentActions";

function ListSlots() {
    const [slots, setSlots] = useState<AppointmentEntity[]>([]);

    const dispatch: AppDispatch = useDispatch();
    const userData: UserData = useSelector(
      (state: RootState) => state.userData.user?._id
    );
  
    useEffect(() => {
        if (userData) {
          dispatch(listDoctorSlots(String(userData))).then((res) => {
            setSlots(res.payload.data);
          });
        }
      }, [dispatch, userData]);
    
  return (
    <div>
      <div className="mt-20">
          {slots.map((appointment, index) => (
            <div
              key={appointment?._id}
              className="appointment-card bg-gray-700 border-white border w-[300px] py-6 rounded-[5px] m-4 px-2"
            >
              <h1 className="font-bold text-xl text-white text-center bg-blue-700">
                SLOTS {index + 1}
              </h1>
              <h2 className="font-bold">Date:</h2>
              <h1 className="px-4">{appointment.date}</h1>
              <h4 className="font-bold">Consultation Methods:</h4>
              <div className="flex">
                {appointment.consultationMethods.map((method, index) => (
                  <div
                    className="bg-gray-700 px-4 border border-gray-400"
                    key={index}
                  >
                    {method}
                  </div>
                ))}
              </div>
              <h4 className="font-bold">Slots:</h4>
              <div className="">
                {appointment.slots.map((slot, index) => (
                  <div
                    className="bg-gray-700 px-4 flex justify-between"
                    key={index}
                  >
                    <h1 className="text-white font-semibold">{index + 1}.</h1>
                    <div className="text-white font-semibold">Start: {slot.start} </div>
                    <div className="text-white font-semibold">End: {slot.end}</div>
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-4">
                <button className="bg-red-600 text-white px-6 py-1">
                  Delete
                </button>
                <button className="bg-green-600 text-white px-6 py-1">
                  Edit
                </button>
              </div>
            </div>
          ))}
        </div>
    </div>
  )
}

export default ListSlots
