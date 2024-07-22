import axios from "axios";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";

const AppointmentDetails = () => {
  const { id } = useParams();
  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }
  const query = useQuery();
  const doctorName = query.get('doctorName');
  console.log("🚀 ~ AppointmentDetails ~ doctorName:", doctorName)
  console.log("🚀 ~ AppointmentDetails ~ id:", id);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const response = await axios.get(
      // `http://localhost:8080/appointment/api/get-slot/${id}`
      `https://mydocctor.online/api/appointment/get-slot/${id}`
    );
    const payment = await axios.get(`https://mydocctor.online/api/payments/find-payment/`)
    console.log("response.data: ", response.data?.data);
    console.log("response.data payment id: ", response.data?.data?.slots[0].paymentId);
  };
  return (
    <div className="w-[82vw] h-[96vh] bg-white">
      <div>
       
      </div>
    </div>
  );
};

export default AppointmentDetails;
