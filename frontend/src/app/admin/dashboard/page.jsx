'use client';

/*
    Página inicial do admin 
        • Verificar se há um admin logado (OK)
		• Exibir os treinamentos (OK)
*/

import { useState, useEffect } from "react";


// Componentes
import TreinamentosLista from "@/components/TreinamentosLista";
import AcoesRapidas from "@/components/admin/AcoesRapidas";
import AcessoRestrito from "@/components/Sweetalert/AcessoRestrito";


export default function Dashboard() {
	const [usuario, setUsuario] = useState([]);
	const [treinamentos, setTreinamentos] = useState([]);
	const [acesso, setAcesso] = useState(null);

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


	//  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
	// EXIBIÇÃO DA PÁGINA = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

	// Se o acesso foi negado
	if (acesso === false) return (
		<>
			<div className="vh-100"></div>

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
			<div className="container py-4">
				{/* Titulo da página*/}
				<div className="d-flex flex-column justify-content-between mb-3">
					<div className="bottom-bordaAzulGM ps-3 col-12"><h1 className="h3 mb-0 fw-bold fs-2">Painel de Administração</h1></div>
					<p className="text-muted small mt-1 ps-3 fs-6">Bem vindo, {usuario.nome}</p>
				</div>

				{/* Lista e ações */}
				<div className="row g-3">

					{/* Listagem de treinamentos */}
					<TreinamentosLista treinamentos={treinamentos} />

					{/* Ações Rápidas */}
					< AcoesRapidas />

				</div>
			</div>
		</>
	);
}


/*
	{ id: 1, nome: "Treinamento 1", descricao: "Treinamento de como passar pretinho no pneu", estado: "Pendente", dataCriacao: Date.now() },
	{ id: 2, nome: "Treinamento 2", descricao: "Treinamento de como usar um paquimetro", estado: "Concluido", dataCriacao: Date.now() },
	{ id: 3, nome: "Treinamento 3", descricao: "Treinamento de como usar uma furadeira no chão", estado: "Em andamento", dataCriacao: Date.now() },
	{ id: 4, nome: "Treinamento 4", descricao: "Treinamento de como subir em uma escada pela parte de cima", estado: "Cancelado", dataCriacao: Date.now() },
	{ id: 5, nome: "Treinamento 5", descricao: "Treinamento de como passar pretinho no pneu", estado: "Pendente", dataCriacao: Date.now() },
	{ id: 6, nome: "Treinamento 6", descricao: "Treinamento de como usar um paquimetro", estado: "Concluido", dataCriacao: Date.now() },
	{ id: 7, nome: "Treinamento 7", descricao: "Treinamento de como usar uma furadeira no chão", estado: "Em andamento", dataCriacao: Date.now() },
	{ id: 8, nome: "Treinamento 8", descricao: "Treinamento de como subir em uma escada pela parte de cima", estado: "Cancelado", dataCriacao: Date.now() },
	{ id: 9, nome: "Treinamento 9", descricao: "Treinamento de como passar pretinho no pneu", estado: "Pendente", dataCriacao: Date.now() },
	{ id: 10, nome: "Treinamento 10", descricao: "Treinamento de como usar um paquimetro", estado: "Concluido", dataCriacao: Date.now() },
	{ id: 11, nome: "Treinamento 11", descricao: "Treinamento de como usar uma furadeira no chão", estado: "Em andamento", dataCriacao: Date.now() },
	{ id: 12, nome: "Treinamento 12", descricao: "Treinamento de como subir em uma escada pela parte de cima", estado: "Cancelado", dataCriacao: Date.now() }
*/