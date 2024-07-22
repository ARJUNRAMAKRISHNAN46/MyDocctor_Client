import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const { id } = useParams();
  const [slotData, setSlotData] = useState<any>();
  const [paymentData, setPaymentData] = useState<any>();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const doctorName = query.get("doctorName");
  console.log("🚀 ~ AppointmentDetails ~ doctorName:", doctorName);
  console.log("🚀 ~ AppointmentDetails ~ id:", id);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get(
      `https://mydocctor.online/api/appointment/get-slot/${id}`
    );
    const payment = await axios.get(
      `https://mydocctor.online/api/payments/find-payment/${response.data?.data?.slots[0].paymentId}`
    );
    setPaymentData(payment?.data?.data);
    console.log("response.data: ", response.data?.data);
    setSlotData(response.data?.data);
    console.log("🚀 ~ fetchData ~ payment:", payment);
    console.log(
      "response.data payment id: ",
      response.data?.data?.slots[0].paymentId
    );
  };
  return (
    <div className="w-[82vw] h-[96vh] bg-white">
      <div className="md:px-20 py-10">
        <h1 className="text-2xl font-semibold text-blue-900 text-center">YOUR BOOKING DETAILS</h1>
        <h1 className="text-center font-semibold">
          DOCTOR NAME: <span>{doctorName}</span>
        </h1>
        <h1 className="text-center font-semibold">
          SLOT TIME: <span>{slotData?.slots[0]?.start}</span>
        </h1>
        <h1 className="text-center font-semibold">
          SLOT DATE: <span>{slotData?.date}</span>
        </h1>
        <h1 className="text-center font-semibold">
          FEES: <span>{paymentData?.fees}</span>
        </h1>
        <h1 className="text-center font-semibold">
          PAYMENT DATE: <span>{paymentData?.createdAt?.toLocaleDateString()}</span>
        </h1>
      </div>
    </div>
  );
};

export default AppointmentDetails;
