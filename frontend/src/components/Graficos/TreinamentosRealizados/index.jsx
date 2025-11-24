"use client";

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

export default function TreinamentosRealizados({treinamentosRealizados}) {
  // Dados do grádico
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun"],
    datasets: [
      {
        label: "Treinamentos realizados",
        data: [12, 19, 8, 15, 22, 10],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  // Configurações do gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: { display: false, position: "top" },
      title: { display: false, text: "Treinamentos por Mês" },
    },
  };

  return <div className="col-12 d-flex flex-column justify-content-between">
    {/* Titulo */}
    <div className="card-header bg-white border-0 px-0 mb-3">
      <div className="d-flex flex-column">
        <h5 className="mb-0 fs-5">Treinamentos realizados por mês</h5>
        <div className="text-muted" style={{fontSize: '0.85rem'}}>Treinamentos realizados por você nos últimos 6 meses</div>
      </div>
    </div>

    {/* Gráfico */}
    <div>
      <Bar data={data} options={options} />
    </div>
  </div>;
}
