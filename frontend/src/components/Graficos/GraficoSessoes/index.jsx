'use client'

import { Bar } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
} from "chart.js";
import { useEffect, useState } from "react";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
);

export default function GraficoSessoes({ treinamentosOfertados }) {
	const [data, setData] = useState(null)

	useEffect(() => {
		async function carregar() {
			const res = await fetch('http://localhost:3000/api/treinamentos/2/seisMeses')
			const data = await res.json()

			console.log(data.dados);
			console.log(formatarDadosParaChart(data.dados));

			setData(formatarDadosParaChart(data.dados))
		}

		carregar()
	}, [])



	function formatarDadosParaChart(registros) {
		const estados = ["Pendente", "Em andamento", "Concluido", "Cancelado"];

		// 1. Extrair meses em ordem sem duplicados
		const labels = [...new Set(registros.map(r => r.mes))];

		// 2. Montar datasets empilhados
		const datasets = estados.map(estado => ({
			label: estado,
			data: labels.map(mes => {
				const item = registros.find(r => r.mes === mes && r.estado === estado);
				return item ? item.total : 0;
			})
		}));

		return { labels, datasets };
	}


	// const data = {
	// 	labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
	// 	datasets: [
	// 		{
	// 			label: 'Cancelado',
	// 			data: [5, 7, 3, 4, 6, 2],
	// 			backgroundColor: '#dc3545',
	// 		},
	// 		{
	// 			label: 'Pendente',
	// 			data: [5, 7, 3, 4, 6, 2],
	// 			backgroundColor: '#ffc107',
	// 		},
	// 		{
	// 			label: 'Em andamento',
	// 			data: [2, 1, 4, 3, 2, 5],
	// 			backgroundColor: '#0d6efd',
	// 		},
	// 		{
	// 			label: 'Concluido',
	// 			data: [3, 4, 1, 2, 3, 4],
	// 			backgroundColor: '#198754',
	// 		}
	// 	]
	// };

	const options = {
		responsive: true,
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: {
				stacked: true,
			},
			y: {
				stacked: true,
			}
		}
	};

	return (
		<div className="col-12 d-flex flex-column justify-content-between">
			{/* Titulo */}
			<div className="card-header bg-white border-0 px-0 mb-3">
				<div className="d-flex flex-column">
					<h5 className="mb-0 fs-5">Sessoes realizadas por mês</h5>
					<div className="text-muted" style={{ fontSize: '0.85rem' }}>Sessoes realizadas por você nos últimos 6 meses</div>
				</div>
			</div>

			{/* Gráfico */}
			<div className="col-12 d-flex justify-content-center align-items-center">
				{ data && <Bar data={data} options={options} /> }
			</div>
		</div>
	);
}
