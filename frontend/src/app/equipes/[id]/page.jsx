"use client";

/*
	Página para listar os membros da equipe
		• Listar os membros (OK)
		• Ao selecionar um membro, abrir modal com os dados do funcionário (OK)
*/

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import './timesid.css';

import CardMembros from "@/components/CardTimes/Card";


export default function Times() {
	const { id } = useParams()

	const [equipe, setEquipe] = useState(null);
	const [membros, setMembros] = useState([]);
	const [ft, setFT] = useState([])
	const [mt, setMT] = useState([])

	// Carregando a equipe
	useEffect(() => {
		async function carregarEquipe() {
			try {
				const res = await fetch(`http://localhost:3000/api/equipes/${id}`);
				const data = await res.json();

				if (data.sucesso) {
					setEquipe(data.dados[0]);
				} else {
					console.log(data.mensagem);
				}
			} catch (err) {
				console.error("Erro ao carregar equipe:", err);
			}
		}

		carregarEquipe();
	}, []);

	// Carregando os membros da equipe
	useEffect(() => {
		async function carregarMenbros() {
			try {
				const res = await fetch(`http://localhost:3000/api/equipes/${id}/membros`);
				const data = await res.json();

				if (data.sucesso) {
					setMembros(data.dados);
				} else {
					console.log(data.mensagem);
				}
			} catch (err) {
				console.error("Erro ao carregar membros:", err);
			}
		}

		carregarMenbros();
	}, [equipe]);

	// Filtrando os membros pelo cargo
	useEffect(() => {
		setFT(membros.filter((m) => m.tipo === 'ft'));
		setMT(membros.filter((m) => m.tipo === 'mt'));
	}, [membros]);

	if (!equipe) {
		return <p className="text-muted mt-5 text-center">Carregando equipe...</p>;
	}

	return (
		<section className="team-section">
			<div className="container">
				{/* Nome e descrição da equipe */}
				<div className="team-header text-center mb-4">
					<h1 className="team-title">{equipe.nome}</h1>
					<p className="team-description">{equipe.descricao}</p>
				</div>

				{/* Listando os FTs da equipe */}
				<div className="d-flex flex-wrap justify-content-center mt-4 gap-3">
					<div className="col-12 text-secondary text-center fs-5">Facilitadores de time</div>
					{
						ft.map((m, index) => <div key={m.id} className="animacao" style={{ "--i": index }} >
							<CardMembros key={m.id} pessoa={m} />
						</div>
						)
					}
				</div>

				{/* Listando os MTs da equipe */}
				<div className="d-flex flex-wrap justify-content-center mt-4 gap-3">
					<div className="col-12 text-secondary text-center fs-5">Membros de time</div>
					{
						mt.map((m, index) => <div key={m.id} className="animacao" style={{ "--i": index }} >
							<CardMembros pessoa={m} />
						</div>
						)
					}
				</div>

			</div>
		</section>
	);
}
