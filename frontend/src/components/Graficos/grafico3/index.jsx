"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function StackedBarChart() {
  const data = {
    labels: [
      "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
      "Jul", "Ago", "Set", "Out", "Nov", "Dez"
    ],
    datasets: [
      {
        label: "Área Técnica",
        data: [5, 6, 8, 7, 10, 12, 9, 11, 14, 13, 15, 16],
        backgroundColor: "rgba(75, 192, 192, 0.7)"
      },
      {
        label: "RH",
        data: [3, 4, 5, 3, 6, 7, 5, 6, 8, 7, 9, 10],
        backgroundColor: "rgba(255, 159, 64, 0.7)"
      },
      {
        label: "Qualidade",
        data: [2, 3, 3, 4, 5, 6, 4, 5, 6, 7, 7, 8],
        backgroundColor: "rgba(153, 102, 255, 0.7)"
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top"
      }
    },
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true,
        beginAtZero: true
      }
    }
  };

  return <Bar data={data} options={options} />;
}
