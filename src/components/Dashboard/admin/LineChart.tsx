import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { listAllPayments } from "../../../redux/actions/PaymentActions";
import { listAllAppoinments } from "../../../redux/actions/AppointmentActions";
import { parse } from "date-fns";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface Payment {
  _id: string;
  doctor_id: string;
  date: string;
  fees: number;
}

export interface Slot {
  start: string;
  _id: string;
  userId?: string;
}

export interface Appointment {
  _id: string;
  doctorId: string;
  date: string;
  slots: Slot[];
}

const LineChart: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await dispatch(listAllPayments());
        const appointmentsResponse = await dispatch(
          listAllAppoinments()
        );
        
        setPayments(paymentsResponse.payload?.data || []);
        setAppointments(appointmentsResponse.payload?.data || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (userData?._id) {
      fetchData();
    }
  }, [dispatch, userData]);

  const parsePaymentDate = (dateStr: string) => {
    return parse(dateStr, "dd-MM-yyyy", new Date());
  };

  const parseAppointmentDate = (dateStr: string) => {
    const [day, month, year] = dateStr.split("-").map(Number);
    return new Date(year, month - 1, day);
  };

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const paymentsByMonth = Array(12).fill(0);
  const appointmentsByMonth = Array(12).fill(0);

  payments.forEach((payment) => {
    const month = parsePaymentDate(payment.date).getMonth();
    paymentsByMonth[month] += payment.fees;
  });

  appointments.forEach((appointment) => {
    const month = parseAppointmentDate(appointment.date).getMonth();
    const appointmentCount = appointment?.slots?.filter(
      (slot) => slot.userId
    ).length;
    appointmentsByMonth[month] += appointmentCount;
  });

  const data = {
    labels: months,
    datasets: [
      {
        label: "Total Fees",
        data: paymentsByMonth,
        borderColor: "rgba(50, 29, 255, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Total Appointments",
        data: appointmentsByMonth,
        borderColor: "rgba(255, 73, 73, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.8)",
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
      y: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)",
        },
        grid: {
          color: "rgba(255, 255, 255, 0.1)",
        },
      },
    },
  };

  return (
    <div className="bg-gray-700 md:w-[60%] p-4 mt-6 md:mt-0 rounded shadow">
      <h2 className="text-xl mb-4 text-gray-300">
        Total Fees & Total Appointments by Month
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
