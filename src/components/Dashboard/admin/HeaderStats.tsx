import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../redux/store";
import { listAllAppoinments } from "../../../redux/actions/AppointmentActions";
import { listAllPayments } from "../../../redux/actions/PaymentActions";
import { listUsers } from "../../../redux/actions/UserActions";

type Stat = {
  label: string;
  value: string;
  percentage: string;
};

const HeaderStats: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    dispatch(listAllAppoinments()).then((res) => {
      setAppointments(res.payload?.data);
    })
    dispatch(listUsers()).then((res) => {
      setPatients(res.payload?.data);
    });
    dispatch(listAllPayments()).then((res) => {
      setPayments(res.payload?.data);
    })
  }, []);
  
  const totalPayment = payments?.reduce((total, pay: any) => total + pay?.fees, 0);
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
    </div>
  );
};

export default HeaderStats;
