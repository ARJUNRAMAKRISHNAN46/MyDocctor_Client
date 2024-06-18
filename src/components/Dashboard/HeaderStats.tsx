import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { listDoctorAppoinments, listUserForSideBar } from "../../redux/actions/AppointmentActions";
import { listPayments } from "../../redux/actions/PaymentActions";

type Stat = {
  label: string;
  value: string;
  percentage: string;
};

const HeaderStats: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [payments, setPayments] = useState([]);
  useEffect(() => {
    dispatch(listDoctorAppoinments(userData?._id)).then((res) => {
      setAppointments(res.payload?.data);
    })
    dispatch(listUserForSideBar(userData?._id)).then((res) => {
      setPatients(res.payload?.data);
    });
    dispatch(listPayments(userData?._id)).then((res) => {
      setPayments(res.payload?.data);
    })
  }, []);
  const totalPayment = payments?.reduce((total, pay) => total + pay?.fees, 0);
  console.log("🚀 ~ totalPayment:", totalPayment/1000)
  const stats: Stat[] = [
    { label: "Appointments", value: String(appointments?.length | 0), percentage: `0.${String(appointments?.length | 0)}%` },
    { label: "Patients", value: String(patients?.length | 0), percentage: `0.${String(patients?.length | 0)}%` },
    { label: "Payments", value: String(totalPayment | 0), percentage: `0.${String(payments?.length | 0)}%` },
  ];
  return (
    <div className="grid grid-cols-1 mt-5 md:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-700 p-4 rounded shadow">
          <div className="text-gray-200">{stat.label}</div>
          <div className="text-2xl text-blue-500 font-bold">{stat.value}</div>
          <div className="text-green-400">{stat.percentage}</div>
        </div>
      ))}
      {/* <div className="bg-gray-700 text-white p-4 rounded shadow flex flex-col justify-between">
        <h1>Sales Report</h1>
         <button className="bg-blue-700 px-4 py-1">Download</button>
        </div> */}
    </div>
  );
};

export default HeaderStats;
