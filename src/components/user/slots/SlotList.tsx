import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { AppDispatch, RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { reserveSlot } from "../../../redux/actions/AppointmentActions";
import toast from "react-hot-toast";

interface ListSlotsProps {
  slots: Array<any>;
  selectedDate: string;
}

const SlotList: React.FC<ListSlotsProps> = ({ slots, selectedDate }) => {
  const userData = useSelector((state: RootState) => state.authData.user);
  const [booked, setBooked] = useState("");
  console.log("🚀 ~ booked:", booked);
  const [status, setStatus] = useState("");
  const dispatch: AppDispatch = useDispatch();
  const [id, setId] = useState("");
  console.log("🚀 ~ id:", id)
  const { id: doctorId } = useParams();

  const makePayment = async () => {
    setBooked(status);
    const stripe = await loadStripe(
      "pk_test_51PIuj3SJ9OOYvlrHOauQWO17OdBdAuDQPghBjv7PupaNcGHw5kYsqw6Dfpgf4Xa3Y2K98W5k2CdS42waGYsaHbpp00L5J3ZxJA"
    );

    const userId = userData?._id;
    const bookingData = {
      doctor_id: doctorId,
      user_id: userId,
      date: selectedDate,
      slot: status,
      fees: 400,
    };

    localStorage.setItem("bookingData", JSON.stringify(bookingData));

    const response: any = await axios.post(
      "https://mydocctor.online/payments/api/create-checkout-session",
      bookingData
    );

    const result = stripe?.redirectToCheckout({
      sessionId: response?.data?.id,
    });
    console.log("🚀 ~ makePayment ~ result:", result);

  };

  const SelectSlot = async (slot: any) => {
    const data = {
      doctorId: String(doctorId),
      date: selectedDate,
      slot: slot?.start,
    };
    dispatch(reserveSlot(data)).then((res) => {
      if (res.type.endsWith("rejected")) {
        toast.error("Slot already booked! Please select other one");
      }
    });
    setId(slot?._id);
    setStatus(slot?.start);
  };

  return (
    <div className="bg-white">
      <div className="md:px-32">
        {slots?.length === 0 && (
          <div>
            <div className="text-center md:mt-16">
              <h1 className="text-xl font-semibold text-red-600">
                No Available Slots!!!
              </h1>
            </div>
          </div>
        )}
        {slots?.map((appointment) => (
          <div
            key={appointment?._id}
            className="appointment-card bg-white py-4 rounded-[5px] m-4 px-2 text-center text-blue-600"
          >
            <h1 className="px-4 font-bold text-2xl text-blue-800">
              AVAILABILITY
            </h1>
            <h4 className="font-bold my-4 text-sm">CONSULTATION METHODS</h4>
            <div className="grid grid-cols-3 md:px-20">
              {appointment.consultationMethods.map((method: any, idx: any) => (
                <div
                  className="bg-white px-4 font-semibold text-center text-blue-600 py-1 mx-4 my-2 rounded border border-blue-600"
                  key={idx}
                >
                  <h1>{method}</h1>
                </div>
              ))}
            </div>
            <h4 className="font-bold text-sm mt-4">SLOTS</h4>
            <div className="bg-white px-4 grid grid-cols-6">
              {appointment.slots.map(
                (slot: any, idx: any) =>
                  !slot?.userId && (
                    <div key={idx}>
                      <div
                        onClick={() => SelectSlot(slot)}
                        className={`${
                          status === slot?.start
                            ? "bg-blue-500 text-white"
                            : "text-blue-600 border-blue-600"
                        } font-semibold m-4 py-1 border text-center rounded`}
                      >
                        {!slot.userId && <h1>{slot.start}</h1>}
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="flex justify-center mt-4">
              <button
                className="text-sm bg-green-600 text-white px-10 py-1.5 rounded-full font-semibold hover:bg-green-500"
                onClick={makePayment}
              >
                CONFIRM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlotList;
