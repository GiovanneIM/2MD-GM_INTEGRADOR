'use client'

import './treinamentoID.css'

import LogoGM from '@/components/LogoGM';

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function Treinamento() {
	const { id } = useParams()
	const [treinamento, setTreinamento] = useState({});

	// Carregando o treinamento
	useEffect(() => {
		async function carregarTreinamento() {
			try {
				const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}`);
				const data = await res.json();

				if (data.sucesso) {
					setTreinamento(data.dados[0]);
					console.log(data.dados[0]);
				} else {
					console.log(data.mensagem);
				}
			} catch (err) {
				console.error("Erro ao carregar treinamento:", err);
			}

		}

		carregarTreinamento();
	}, []);

	return (
		<>
			<div className='container mt-5 py-5'>
				<div className='row justify-content-center'>
					<div className='col-lg-10'>
						<div className='contact-wrapper'>
							<div className='row g-0'>
								<div className='col-md-5'>
									<div className='contact-info h-100'>
										<h3 className='mb-4'>{treinamento.nome ?? 'Nome do treinamento'}</h3>
										<div className="icone">
											<p className='mb-4'>
												{treinamento.descricao ?? 'Descrição do treinamento'}
											</p>
											<LogoGM cor={'#fff'} tamanho={55} />
										</div>
									</div>
								</div>
								<div className='col-md-7'>
									<div className='contact-form'>
										{/* Titulo da página*/}
										<div className='d-flex flex-column justify-content-between mb-3 pb-2'>
											<div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2 pb-2'>Realizar mudanças no treinamento</h1></div>
										</div>
										<form>
											<div className='row'>
												<div className='mb-3'>
													<label className='form-label'>Trocar nome:</label>
													<input
														type='text'
														className='form-control'
														placeholder='Novo nome'
													/>
												</div>
											</div>
											<div className='mb-3'>
												<label className='form-label'>Descrição:</label>
												<textarea
													className='form-control'
													rows='5'
													placeholder='Nova descrição'
												/>
											</div>
											<div className='mb-3'>
												<label className='form-label'>Status:</label>
												<select className='form-select'>
													<option value="">Selecione o novo status</option>
													<option value="concluido">Concluído</option>
													<option value="em andamento">Em Andamento</option>
													<option value="cancelado">Cancelado</option>
													<option value="pendente">Pendente</option>
												</select>
											</div>

											<button className='botao'>
												Enviar
											</button>
										</form>
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
