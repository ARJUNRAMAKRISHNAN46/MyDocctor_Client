// import React, { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";
// import { AppDispatch, RootState } from "../../redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
// import { listPayments } from "../../redux/actions/PaymentActions";
// import { Appointment, Payment } from "./LineChart";
// import moment from "moment";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const BarChart: React.FC = () => {
//   const [payments, setPayments] = useState<Payment[]>([]);
//   const [appointments, setAppointments] = useState<Appointment[]>([]);
//   const dispatch: AppDispatch = useDispatch();
//   const userData = useSelector((state: RootState) => state.authData.user);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const paymentsResponse = await dispatch(listPayments(userData?._id));
//         const appointmentsResponse = await dispatch(
//           listDoctorAppoinments(userData?._id)
//         );

//         setPayments(paymentsResponse.payload?.data || []);
//         setAppointments(appointmentsResponse.payload?.data || []);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     if (userData?._id) {
//       fetchData();
//     }
//   }, [dispatch, userData]);

//   const getLast7Days = () => {
//     const days = [];
//     for (let i = 6; i >= 0; i--) {
//       days.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
//     }
//     return days;
//   };

//   const filterDataByDate = (data: any, key: any, format: any) => {
//     const last7Days = getLast7Days();
//     return last7Days.map((date) => {
//       const count = data.filter((item: any) => {
//         const itemDate = moment(item[key], format).format("YYYY-MM-DD");
//         return itemDate === date;
//       }).length;
//       return count;
//     });
//   };

//   const filterPaymentsByDate = (payments: any, key: any, format: any) => {
//     const last7Days = getLast7Days();
//     return last7Days.map((date) => {
//       const total = payments
//         .filter((item: any) => {
//           const itemDate = moment(item[key], format).format("YYYY-MM-DD");
//           return itemDate === date;
//         })
//         .reduce((sum: any, item: any) => sum + item.fees, 0);
//       return total;
//     });
//   };

//   const labels = getLast7Days().map((date) => moment(date).format("MM-DD"));
//   const appointmentsData = filterDataByDate(appointments, "date", "DD-MM-YYYY");
//   const paymentsData = filterPaymentsByDate(payments, "date", "DD-MM-YYYY");

//   const data = {
//     labels,
//     datasets: [
//       {
//         label: "Appointments",
//         data: appointmentsData,
//         backgroundColor: "rgba(57, 89, 255, 0.8)",
//         borderColor: "rgba(54, 162, 235, 1)",
//         borderWidth: 1,
//       },
//       {
//         label: "Payments",
//         data: paymentsData,
//         backgroundColor: "rgba(255, 74, 74, 0.8)",
//         borderColor: "rgba(255, 99, 132, 1)",
//         borderWidth: 1,
//       },
//     ],
//   };

//   const options = {
//     plugins: {
//       legend: {
//         labels: {
//           color: "rgba(255, 255, 255, 0.8)",
//         },
//       },
//     },
//     scales: {
//       x: {
//         ticks: {
//           color: "rgba(255, 255, 255, 0.8)",
//         },
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//       },
//       y: {
//         ticks: {
//           color: "rgba(255, 255, 255, 0.8)",
//         },
//         grid: {
//           color: "rgba(255, 255, 255, 0.1)",
//         },
//       },
//     },
//   };

//   return (
//     <div className="bg-gray-700 mt-6 md:mt-0 md:w-[38%] p-4 rounded shadow">
//       <h2 className="text-xl mb-4 text-gray-300">Total Fees & Total Appointments by last week</h2>
//       <Bar data={data} options={options} />
//     </div>
//   );
// };

// export default BarChart;

import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { listDoctorAppoinments } from "../../redux/actions/AppointmentActions";
import { listPayments } from "../../redux/actions/PaymentActions";
import { Appointment, Payment } from "./LineChart";
import moment from "moment";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const dispatch: AppDispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.authData.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const paymentsResponse = await dispatch(listPayments(userData?._id));
        const appointmentsResponse = await dispatch(
          listDoctorAppoinments(userData?._id)
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

  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      days.push(moment().subtract(i, "days").format("YYYY-MM-DD"));
    }
    return days;
  };

  const filterDataByDate = (data: any, key: any, format: any) => {
    const last7Days = getLast7Days();
    return last7Days.map((date) => {
      let count = 0;

      data.forEach((item: any) => {
        const itemDate = moment(item[key], format).format("YYYY-MM-DD");

        if (itemDate === date) {
          item.slots.forEach((slot: any) => {
            if (slot.userId) {
              count++;
            }
          });
        }
      });

      return count;
    });
  };

  const filterPaymentsByDate = (payments: any, key: any, format: any) => {
    const last7Days = getLast7Days();
    return last7Days.map((date) => {
      const total = payments
        .filter((item: any) => {
          const itemDate = moment(item[key], format).format("YYYY-MM-DD");
          return itemDate === date;
        })
        .reduce((sum: any, item: any) => sum + item.fees, 0);
      return total;
    });
  };

  const labels = getLast7Days().map((date) => moment(date).format("MM-DD"));
  const appointmentsData = filterDataByDate(appointments, "date", "DD-MM-YYYY");
  const paymentsData = filterPaymentsByDate(payments, "date", "DD-MM-YYYY");

  const data = {
    labels,
    datasets: [
      {
        label: "Appointments",
        data: appointmentsData,
        backgroundColor: "rgba(57, 89, 255, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Payments",
        data: paymentsData,
        backgroundColor: "rgba(255, 74, 74, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
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
    <div className="bg-gray-700 mt-6 md:mt-0 md:w-[38%] p-2 rounded shadow">
      <h2 className="text-xl mb-2 text-gray-300">
        Total Fees & Total Appointments by last week
      </h2>
      <div style={{ height: "200px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
