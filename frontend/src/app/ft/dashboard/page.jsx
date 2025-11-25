"use client";

import { useState, useEffect } from "react";

import TreinamentosLista from "@/components/TreinamentosLista";
import AcoesRapidas from "@/components/ft/AcoesRapidas";
import Calendario from "@/components/Calendario";

// Gráficos
import GraficoEstados from "@/components/Graficos/GraficoEstados";
import GraficoTreinamentos from "@/components/Graficos/GraficoTreinamentos";
import GraficoSessoes from "@/components/Graficos/GraficoSessoes";


export default function Dashboard() {
	const [usuario, setUsuario] = useState([]);
	const [treinamentosOferecidos, setTreinamentosOferecidos] = useState([]);
	const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
	const [treinamentosExibidos, setTreinamentosExibidos] = useState([]);
	const [opcaoExibir, setOpcaoExibir] = useState('Realizados');

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
				setUsuario(data.dados);
			}
		}

		carregarUsuario();
	}, [])

	/* Carregando os treinamentos oferecidos pelo usuário*/
	useEffect(() => {
		if (usuario.id) {
			try {
				async function carregarTreinamentos() {
					const res = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}`);
					const data = await res.json();

					if (data.sucesso) {
						// console.log(data.dados);

						setTreinamentosOferecidos(data.dados);
					}
					else {
						console.log(data.mensagem);
					}
				}

				carregarTreinamentos()
			}
			catch {
				/* Erro caso a API esteja desligada */
			}
		}
	}, [usuario])

	/* Carregando os treinamentos realizados pelo usuário*/
	useEffect(() => {
		if (usuario.id) {
			try {
				async function carregarTreinamentos() {
					const res = await fetch(`http://localhost:3000/api/treinamentos/${usuario.id}`);
					const data = await res.json();

					if (data.sucesso) {
						// console.log(data.dados);

						setTreinamentosRealizados(data.dados);
						setTreinamentosExibidos(data.dados);
					}
					else {
						console.log(data.mensagem);
					}
				}

				carregarTreinamentos()
			}
			catch {
				/* Erro caso a API esteja desligada */
			}
		}
	}, [usuario])

	/* Controle para o filtro de quais treinamentos estão sendo exibidos (Inscritos ou Ofertados) */
	useEffect(() => {
		if (opcaoExibir === 'Realizados') {
			setTreinamentosExibidos(treinamentosRealizados);
		}
		else {
			setTreinamentosExibidos(treinamentosOferecidos);
		}
	}, [opcaoExibir])


	return (
		<>
			<div className="container py-4">
				{/* Titulo da página*/}
				<div className="d-flex flex-column justify-content-between mb-3">
					<div className="bottom-bordaAzulGM ps-3 col-12"><h1 className="h3 mb-0 fw-bold fs-2">Painel de Controle</h1></div>
					<p className="text-muted small mt-1 ps-3 fs-6">Bem vindo(a), {usuario?.nome}</p>
				</div>

				{/* Lista e ações */}
				<div className="row g-3">

					{/* Listagem de treinamentos */}
					<div className="col-lg-6">
						<div className="col-12 h-100">
							<TreinamentosLista
								treinamentosExibidos={treinamentosExibidos ?? []}
								setOpcaoExibir={setOpcaoExibir}
								tipoUsuario={usuario.tipo}
							/>
						</div>
					</div>

					{/* Ações rápidas e gráfico de pizza */}
					<div className="col-lg-6">

						{/* Ações Rápidas */}
						<div className="col-12 h-50 pb-2">
							<AcoesRapidas />
						</div>

						{/* Gráfico de pizza */}
						<div className="col-12 h-50 pt-2">
							<GraficoEstados treinamentos={treinamentosExibidos} />
						</div>
					</div>

					{/* Grafico de treinamentos */}
					<div className="col-lg-6">
						<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
							<GraficoTreinamentos opcaoExibir={opcaoExibir} />
						</div>
					</div>

					{/* Grafico de sessões */}
					<div className="col-lg-6">
						<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
							<GraficoSessoes />
						</div>
					</div>

					{/* Teste Calendário */}

					{/* Calendário */}
					{/* <div className="col-lg-6">
						<div className="col-12 h-100 bg-white shadow p-3 rounded">
							<div className='col-12 d-flex mb-3 align-items-center gap-2'>
								<h5 className="mb-0 fs-5">Próximas sessões</h5>
							</div>

							<Calendario />
						</div>
					</div> */}

					{/* <div className="col-lg-6">
						<div className="col-lg-12 h-50 pb-2">
							<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
								<GraficoTreinamentos opcaoExibir={opcaoExibir} />
							</div>
						</div>

						<div className="col-lg-12 h-50 pt-2">
							<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
								<GraficoSessoes />
							</div>
						</div>
					</div> */}

				</div>
			</div>
		</>
	);
}
