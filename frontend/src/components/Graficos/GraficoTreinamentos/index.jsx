'use client'

import { Bar } from 'react-chartjs-2';
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
} from 'chart.js';
import { useEffect, useState } from 'react';

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Tooltip,
);

export default function GraficoTreinamentos({ opcaoExibir }) {
	const [data, setData] = useState({ labels: [], datasets: [{}] })

	/* Carregando os treinamentos */
	useEffect(() => {
		setData({ labels: [], datasets: [{}] });

		async function carregar() {
			// Carregando os treinamentos realizados
			if (opcaoExibir === 'Realizados') {
				const res = await fetch('http://localhost:3000/api/treinamentos/participante/2/seisMeses')
				const data = await res.json()
				setData(formatarDadosParaChart(data.dados.treinamentos))
			}
			// Carregando os treinamentos criados
			else {
				const res = await fetch('http://localhost:3000/api/treinamentos/criador/2/seisMeses')
				const data = await res.json()
				setData(formatarDadosParaChart(data.dados.treinamentos))
			}
		}

		carregar()
	}, [opcaoExibir])

	/* Função para formatar os dados da API para a formatação do Data do Chart.js */
	function formatarDadosParaChart(registros) {
		const estados = [
			{
				estado: 'Pendente',
				cor: '#0d6efd',
			},
			{
				estado: 'Em andamento',
				cor: '#ffc107',
			},
			{
				estado: 'Concluido',
				cor: '#198754',
			},
			{
				estado: 'Cancelado',
				cor: '#dc3545'
			}
		];

		// Obtendo os meses
		const labels = [...new Set(registros.map(r => r.mes))];

		// Montando os datasets
		const datasets = estados.map(estado => ({
			label: estado.estado,

			backgroundColor: estado.cor,

			data: labels.map(mes => {
				const item = registros.find(r => r.mes === mes && r.estado === estado.estado);
				return item ? item.total : 0;
			})
		}));

		return { labels, datasets };
	}

	/* Configurações do gráfico */
	const options = {
		responsive: true,
		plugins: {
			legend: { display: false },
		},
		scales: {
			x: { stacked: true },
			y: { stacked: true }
		}
	};

	return (
		<div className='col-12 d-flex flex-column justify-content-between'>
			{/* Titulo */}
			<div className='card-header bg-white border-0 px-0 mb-3'>
				<div className='d-flex flex-column'>
					<h2 className='mb-0 fs-5'>Treinamentos {opcaoExibir} por mês</h2>
					<div className='text-muted' style={{ fontSize: '0.85rem' }}>Treinamentos {opcaoExibir} por você nos últimos 6 meses</div>
				</div>
			</div>

			{/* Gráfico */}
			<div className='col-12 d-flex justify-content-center align-items-center'>
				{data && <Bar data={data} options={options} />}
			</div>
		</div>
	);
}
