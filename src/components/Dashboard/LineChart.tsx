import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart: React.FC = () => {
  const data = {
    labels: [
      "Oct",
      "Nov",
      "Dec",
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
    ],
    datasets: [
      {
        label: "Total Revenue",
        data: [10, 20, 30, 20, 80, 60, 10, 80, 90, 80, 110],
        borderColor: "rgba(50, 29, 255, 0.8)",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
      },
      {
        label: "Total Sales",
        data: [25, 15, 15, 75, 45, 15, 65, 75, 45, 95, 105],
        borderColor: "rgba(255, 73, 73, 0.8)",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          color: "rgba(255, 255, 255, 0.8)", // Change legend text color
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgba(255, 255, 255, 0.8)", // Change X-axis tick color
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
    <div className="bg-gray-700 w-[60%] p-4 rounded shadow">
      <h2 className="text-xl mb-4 text-gray-300">
        Total Revenue & Total Sales
      </h2>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
