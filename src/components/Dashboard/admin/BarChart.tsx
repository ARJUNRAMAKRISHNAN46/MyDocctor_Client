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
import { parse, subDays, format } from "date-fns";

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
        const appointmentsResponse = await dispatch(listAllAppoinments());

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

  const parsePaymentDate = (dateStr: string): Date => {
    return parse(dateStr, "dd-MM-yyyy", new Date());
  };

  function countPaymentsByDay(data: Payment[]): Record<string, number> {
    const counts: Record<string, number> = {};

    data.forEach((payment) => {
      const date = parsePaymentDate(payment.date).toISOString().slice(0, 10);

      if (!counts[date]) {
        counts[date] = 0;
      }

      counts[date] += payment.fees;
    });

    return counts;
  }

  function countAppointmentsByDay(data: Appointment[]): Record<string, number> {
    const counts: Record<string, number> = {};

    data.forEach((appointment) => {
      const date = appointment.date;

      if (!counts[date]) {
        counts[date] = 0;
      }

      counts[date]++;
    });

    return counts;
  }

  const last7Days = Array.from({ length: 7 }, (_, index) =>
    subDays(new Date(), index)
  );
  const formattedLast7Days = last7Days.map((day) => format(day, "yyyy-MM-dd"));

  const filteredPayments = payments.filter((payment) =>
    formattedLast7Days.includes(
      parsePaymentDate(payment.date).toISOString().slice(0, 10)
    )
  );

  const filteredAppointments = appointments.filter((appointment) =>
    formattedLast7Days.includes(appointment.date)
  );

  const paymentsByDay = countPaymentsByDay(filteredPayments);
  const appointmentsByDay = countAppointmentsByDay(filteredAppointments);

  console.log("Payments by Day:", paymentsByDay);
  console.log("Appointments by Day:", appointmentsByDay);

  const labels = formattedLast7Days.reverse();

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Total Fees",
        data: labels.map((date) => paymentsByDay[date] || 0),
        borderColor: "rgba(50, 29, 255, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Total Appointments",
        data: labels.map((date) => appointmentsByDay[date] || 0),
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
    <div className="bg-gray-700 md:w-[40%] p-4 mt-6 md:mt-0 rounded shadow ml-4">
      <h2 className="mb-6 text-gray-300">
        Total Fees & Total Appointments for the Last 7 Days
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
