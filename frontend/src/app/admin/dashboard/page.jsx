'use client';

/*
	Página inicial do admin 
		• Verificar se há um admin logado (OK)
		• Exibir os treinamentos (OK)
*/

import { useState, useEffect } from 'react';


// Componentes
import AcoesRapidas from '@/components/admin/AcoesRapidas';
import AcessoRestrito from '@/components/Sweetalert/AcessoRestrito';
import EstadoTreinamento from '@/components/EstadoTreinamento/page';


export default function Dashboard() {
	const [usuario, setUsuario] = useState([]);
	const [treinamentos, setTreinamentos] = useState([]);
	const [acesso, setAcesso] = useState(null);

	const [treinamentosExibidos, setTreinamentosExibidos] = useState([]);
	const [opcaoExibir, setOpcaoExibir] = useState('Realizados');


	/* Carregando o usuário logado */
	useEffect(() => {
		try {
			async function carregarUsuario() {
				const res = await fetch('http://localhost:3000/api/auth/perfil', {
					headers: {
						'Authorization': 'Bearer ' + sessionStorage.getItem('token')
					}
				});
				const data = await res.json();

				// Verificando se há um usuário logado
				if (data.sucesso) {
					setUsuario(data.dados)

					// Verificando se o usuário é um admin
					if (data.dados.tipo === 'admin') {
						setAcesso(true)
					}
					else {
						setAcesso(false)
					}
				}
				else {
					setAcesso(false)
				}
			}

			carregarUsuario()
		}
		catch {
			setAcesso(false)
		}
	}, [])

	/* Carregando os treinamentos */
	useEffect(() => {
		try {
			async function carregarTreinamentos() {
				const res = await fetch('http://localhost:3000/api/treinamentos');
				const data = await res.json();

				if (data.sucesso) {
					console.log(data.dados);

					setTreinamentos(data.dados);
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
	}, [usuario])

	'use client'


	//  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	// EXIBIÇÃO DA PÁGINA = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

	// Se o acesso foi negado
	if (acesso === false) return (
		<>
			<div className='vh-100'></div>

			{/* Exibindo alerta dizendo que o acesso foi negado */}
			<AcessoRestrito text={`
				Essa página é <b>restrita a administradores</b>.<br>
				Você será redirecionado em alguns segundos
			`} />

			{/* Redirecionando o usuário */}
			{
				setTimeout(() => {
					usuario.tipo
						? window.location.href = `/${usuario.tipo}/dashboard`
						: window.location.href = '/login'
				}, 3500)
			}
		</>
	)

	// Se o acesso foi permitido
	if (acesso === true) return (
		<>
			<div className='container py-4'>
				{/* Titulo da página*/}
				<div className='d-flex flex-column justify-content-between mb-3'>
					<div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Painel de Controle - Administrador</h1></div>
					<p className='text-muted small mt-1 ps-3 fs-6'>Bem vindo, {usuario.nome}</p>
				</div>

				{/* Corpo da página */}
				<div className='row g-3'>

					{/* Ações Rápidas */}
					<div className='col-lg-12'>
						{/* Ações Rápidas */}
						<div className='col-12 p-2'>
							< AcoesRapidas />
						</div>
					</div>

					<div className='d-flex flex-wrap pt-3 row-gap-3'>
						<div className='col-12 col-md-6 col-lg-4 px-2'>
							<div className="col-12 bg-white shadow-sm rounded ratio ratio-1x1 top-bordaAzulGM bordaAzulGM">
								<div className='d-flex flex-column col-12 h-100'>
									<div className='col-12 fs-4 p-2 text-center'>Treinamentos pendentes</div>
									<div className='p-3 flex-grow-1 overflow-y-scroll'>
										{treinamentos && treinamentos.filter((tr) => tr.estado === 'Pendente').map((tr) =>
											<div key={tr.id} className='d-flex align-items-center gap-3 border rounded p-2 mb-3'>
												<EstadoTreinamento estado={tr.estado} />
												<div className='flex-grow-1'>
													<div className='fw-bold'>{tr.nome}</div>
													<div>{tr.criador}</div>
												</div>
												<a className='btn btn-White' href={`/admin/treinamento/${tr.id}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
													</svg>
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 col-md-6 col-lg-4 px-2'>
							<div className="col-12 bg-white shadow-sm rounded ratio ratio-1x1 top-bordaAzulGM bordaAzulGM">
								<div className='d-flex flex-column col-12 h-100'>
									<div className='col-12 fs-4 p-2 text-center'>Treinamentos em andamento</div>
									<div className='p-3 flex-grow-1 overflow-y-scroll'>
										{treinamentos && treinamentos.filter((tr) => tr.estado === 'Em andamento').map((tr) =>
											<div key={tr.id} className='d-flex align-items-center gap-3 border rounded p-2 mb-3'>
												<EstadoTreinamento estado={tr.estado} />
												<div className='flex-grow-1'>
													<div className='fw-bold'>{tr.nome}</div>
													<div>{tr.criador}</div>
												</div>
												<a className='btn btn-White' href={`/admin/treinamento/${tr.id}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
													</svg>
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>

						<div className='col-12 col-md-6 col-lg-4 px-2'>
							<div className="col-12 bg-white shadow-sm rounded ratio ratio-1x1 top-bordaAzulGM bordaAzulGM">
								<div className='d-flex flex-column col-12 h-100'>
									<div className='col-12 fs-4 p-2 text-center'>Treinamentos concluídos</div>
									<div className='p-3 flex-grow-1 overflow-y-scroll'>
										{treinamentos && treinamentos.filter((tr) => (tr.estado === 'Concluido') || (tr.estado === 'Cancelado')).map((tr) =>
											<div key={tr.id} className='d-flex align-items-center gap-3 border rounded p-2 mb-3'>
												<EstadoTreinamento estado={tr.estado} />
												<div className='flex-grow-1'>
													<div className='fw-bold'>{tr.nome}</div>
													<div>{tr.criador}</div>
												</div>
												<a className='btn btn-White' href={`/admin/treinamento/${tr.id}`}>
													<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
														<path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
													</svg>
												</a>
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
