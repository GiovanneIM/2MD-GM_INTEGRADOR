"use client";

import { useState, useEffect } from "react";

import TreinamentosLista from "@/components/TreinamentosLista";

// Gráficos
import EstadosTreinamentos from "@/components/Graficos/EstadosTreinamentos";
import TreinamentosRealizados from "@/components/Graficos/TreinamentosRealizados";
import TreinamentosOfertados from "@/components/Graficos/TreinamentosOfertados";

export default function Dashboard() {
	const [usuario, setUsuario] = useState([]);
	const [treinamentosOferecidos, setTreinamentosOferecidos] = useState([]);
	const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);

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
						console.log(data.dados);

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
						console.log(data.dados);

						setTreinamentosRealizados(data.dados);
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
					<div className="col-lg-7">
						<TreinamentosLista treinamentosRealizados={treinamentosRealizados ?? []} treinamentosOfertados={treinamentosOferecidos ?? []} tipoUsuario={usuario.tipo} />
					</div>

					{/* Gráficos */}
					<div className="col-lg-5">
						{/* Gráfico de pizza */}
						<div className="col-12 h-50 pb-2">
							<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
								<EstadosTreinamentos treinamentos={treinamentosRealizados} />
							</div>
						</div>

						{/* Grafico de treinamento realizado*/}
						<div className="col-12 h-50 pt-2">
							<div className="h-100 col-12 bg-white rounded shadow-sm p-3">
								<TreinamentosRealizados />
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

