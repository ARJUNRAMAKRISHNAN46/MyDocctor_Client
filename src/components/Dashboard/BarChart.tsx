import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart: React.FC = () => {
  const data = {
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Sales",
        data: [30, 50, 70, 40, 60, 80, 100],
        backgroundColor: "rgba(57, 89, 255, 0.8)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Revenue",
        data: [20, 40, 60, 30, 50, 70, 90],
        backgroundColor: "rgba(255, 74, 74, 0.8)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
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
    <div className="bg-gray-700 mt-6 md:mt-0 md:w-[38%] p-4 rounded shadow">
      <h2 className="text-xl mb-4 text-gray-300">Profit this week</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;
