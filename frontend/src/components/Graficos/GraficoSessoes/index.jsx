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

export default function GraficoSessoes({ opcaoExibir, idUsuario }) {
	const [data, setData] = useState({ labels: [], datasets: [{}] })

	/* Carregando os treinamentos */
	useEffect(() => {
		setData({ labels: [], datasets: [{}] });

		// Função para carregar as sessões
		async function carregarSessoes() {
			// Carregando as sessões realizadas
			if (opcaoExibir === 'Realizados') {
				const res = await fetch(`http://localhost:3000/api/treinamentos/sessoes/participante/${idUsuario}/seisMeses`)
				const data = await res.json()
				setData(formatarDadosParaChart(data.dados.sessoes))
			}
			// Carregando as sessões realizadas
			else {
				const res = await fetch(`http://localhost:3000/api/treinamentos/sessoes/criador/${idUsuario}/seisMeses`)
				const data = await res.json()
				setData(formatarDadosParaChart(data.dados.sessoes))
			}
		}

		carregarSessoes()
	}, [opcaoExibir])

	/* Função para formatar os dados da API para a formatação do Data do Chart.js */
	function formatarDadosParaChart(registros) {
		const estados = [
			{ estado: 'Agendada', cor: '#CECECE' },
			{ estado: 'Em andamento', cor: '#ffc107' },
			{ estado: 'Concluida', cor: '#198754' }
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

		console.log('labels');
		console.log(labels);
		console.log('datasets');
		console.log(datasets);

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

	return (<>
		<div className='col-12 d-flex flex-column justify-content-between'>
			{/* Titulo */}
			<div className='card-header bg-white border-0 px-0 mb-3'>
				<div className='d-flex flex-column'>
					<h2 className='mb-0 fs-5'>Sessões {opcaoExibir} por mês</h2>
					<div className='text-muted' style={{ fontSize: '0.85rem' }}>Sessões {opcaoExibir} por você nos últimos 6 meses</div>
				</div>
			</div>

			{/* Gráfico */}
			<div className='col-12 d-flex justify-content-center align-items-center'>
				{data && <Bar data={data} options={options} />}
			</div>
		</div>
	</>);
}
