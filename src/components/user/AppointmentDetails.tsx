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
      `https://mydocctor-server-7.onrender.com/appointment/api/get-slot/${id}`
    );
    const payment = await axios.get(
      `https://mydocctor-server-7.onrender.com/payments/api/find-payment/${response.data?.data?.slots[0].paymentId}`
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

  const formatDate = (dateString: any) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString();
  };

  console.log(paymentData,"==========================================================>");
  
  return (
    <div className="w-[82vw] h-[96vh] bg-white">
      <div className="md:px-20 py-10">
        <h1 className="text-2xl font-semibold text-blue-900 text-center">YOUR BOOKING DETAILS</h1>
        <h1 className="text-center font-semibold mt-6 text-gray-600">
          DOCTOR NAME: <span className="text-gray-800 ml-2">{doctorName}</span>
        </h1>
        <h1 className="text-center font-semibold text-gray-600">
          SLOT TIME: <span className="text-gray-800 ml-2">{slotData?.slots[0]?.start}</span>
        </h1>
        <h1 className="text-center font-semibold text-gray-600">
          SLOT DATE: <span className="text-gray-800 ml-2">{slotData?.date}</span>
        </h1>
        <h1 className="text-center font-semibold text-gray-600">
          FEES: <span className="text-gray-800 ml-2">{paymentData?.fees}</span>
        </h1>
        <h1 className="text-center font-semibold text-gray-600">
          PAYMENT DATE: <span className="text-gray-800 ml-2">{formatDate(paymentData?.createdAt)}</span>
        </h1>
      </div>
    </div>
  );
};

export default AppointmentDetails;
