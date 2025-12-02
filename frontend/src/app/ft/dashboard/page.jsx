'use client';

import { useState, useEffect } from 'react';

import TreinamentosLista from '@/components/TreinamentosLista';
import AcoesRapidas from '@/components/ft/AcoesRapidas';
import Calendario from '@/components/Calendario';

// Gráficos
import GraficoEstados from '@/components/Graficos/GraficoEstados';
import GraficoTreinamentos from '@/components/Graficos/GraficoTreinamentos';
import GraficoSessoes from '@/components/Graficos/GraficoSessoes';


export default function Dashboard() {
	const [usuario, setUsuario] = useState([]);

	const [treinamentosExibidos, setTreinamentosExibidos] = useState([]);

	const [opcaoExibir, setOpcaoExibir] = useState('Realizados');
	const [pagina, setPagina] = useState(1);

	/* Carregando o usuário logado */
	useEffect(() => {
		async function carregarUsuario() {
			const res = await fetch('http://localhost:3000/api/auth/perfil', {
				headers: {
					'Authorization': 'Bearer ' + sessionStorage.getItem('token')
				}
			});
			const data = await res.json();

			// Verificando se há um usuário logado
			if (data.sucesso) {
				sessionStorage.setItem('usuario', JSON.stringify(data.dados));
				console.log(data.dados);
				setUsuario(data.dados);
			}
		}

		carregarUsuario();
	}, [])

	/* Função para carregar os treinamentos oferecidos pelo usuário */
	async function carregarTreinamentosOferecidos() {
		const res = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}/${pagina}`);
		const data = await res.json();

		if (data.sucesso) {
			setTreinamentosExibidos(data.dados);
		}
		else {
			console.log(data.mensagem);
		}
	}

	/* Função para cerragar os treinamentos realizados pelo usuário */
	async function carregarTreinamentosRealizados() {
		const res = await fetch(`http://localhost:3000/api/treinamentos/${usuario.id}`);
		const data = await res.json();

		if (data.sucesso) {
			setTreinamentosExibidos(data.dados);
		}
		else {
			console.log(data.mensagem);
		}
	}

	/* Controlador para carregar os treinamentos ao atualizar a página ou a opção de exibição */
	useEffect(() => {
		if (!usuario.id) return;

		if (opcaoExibir === 'Realizados') {
			carregarTreinamentosRealizados();
		} else {
			carregarTreinamentosOferecidos();
		}
		
	}, [usuario.id, pagina, opcaoExibir]);

	useEffect(() => { setPagina(1); }, [opcaoExibir]);


	return (
		<>
			<div className='container py-4'>
				{/* Titulo da página*/}
				<div className='d-flex flex-column justify-content-between mb-3'>
					<div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Painel de Controle - Facilitador de time</h1></div>
					<p className='text-muted small mt-1 ps-3 fs-6'>Bem vindo(a), {usuario?.nome}</p>
				</div>

				{/* Corpo da página */}
				<div className='row g-3'>

					{/* Listagem de treinamentos */}
					<div className='col-lg-6'>
						<div className='col-12 h-100'>
							<TreinamentosLista
								treinamentosExibidos={treinamentosExibidos ?? []}
								setOpcaoExibir={setOpcaoExibir}
								setPagina={setPagina}
								pagina={pagina}
								tipoUsuario={usuario.tipo}
							/>
						</div>
					</div>

					{/* Ações rápidas e gráfico de pizza */}
					<div className='col-lg-6'>

						{/* Ações Rápidas */}
						<div className='col-12 h-50 pb-2'>
							<AcoesRapidas />
						</div>

						{/* Gráfico de pizza */}
						<div className='col-12 h-50 pt-2'>
							<GraficoEstados treinamentos={treinamentosExibidos} />
						</div>
					</div>

					{/* Grafico de treinamentos */}
					<div className='col-lg-6'>
						<div className='h-100 col-12 bg-white rounded shadow-sm p-3'>
							<GraficoTreinamentos opcaoExibir={opcaoExibir} />
						</div>
					</div>

					{/* Grafico de sessões */}
					<div className='col-lg-6'>
						<div className='h-100 col-12 bg-white rounded shadow-sm p-3'>
							<GraficoSessoes />
						</div>
					</div>

				</div>
			</div>
		</>
	);
}
