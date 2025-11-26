"use client";

/*
  Página onde o FT ou ADM acessa determinado treinamento e pode realizar alterações nele.
  Nesta página podemos trocar o nome, descrição e status dos treinamentos 
*/

import './treinamentoID.css'

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

import LogoGM from "@/components/LogoGM";
import EstadoTreinamento from '@/components/EstadoTreinamento/page';

export default function VerTreinamento() {
    const { id } = useParams()

    const [treinamento, setTreinamento] = useState({});
    const [usuario, setUsuario] = useState({});
    const [dataCriacao, setDataCriacao] = useState("00/00/0000");



    // Carregando o treinamento
    useEffect(() => {
        async function carregarTreinamento() {
            try {
                const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}`);
                const data = await res.json();

                if (data.sucesso) {
                    setTreinamento(data.dados[0]);
                } else {
                    console.log(data.mensagem);
                }
            } catch (err) {
                console.error("Erro ao carregar treinamento:", err);
            }

        }

        carregarTreinamento();
    }, []);



    /* Carregando o usuário logado */
    useEffect(() => {
        async function carregarUsuario() {
            const res = await fetch('http://localhost:3000/api/auth/perfil', {
                headers: {
                    'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                }
            });
            const data = await res.json();

            if (data.sucesso) {
                sessionStorage.setItem('usuario', JSON.stringify(data.dados));
                setUsuario(data.dados);
            }
        }

        carregarUsuario();
    }, []);

    const Status = {
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };

    return (<>
        <div className='container h-100 py-4 d-flex flex-column'>
            {/* Titulo da página*/}
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Gerenciador de Treinamento</h1></div>
            </div>

            {/* Corpo da página */}
            <div className="row">

                <div className="col-12 bg-white p-3 rounded shadow-sm d-flex flex-wrap row-gap-3">
                    <div className="col-12 col-md-6 pe-md-3 d-flex flex-column gap-3 border-end">
                        {/* Nome do treinamento */}
                        <div className='border-bottom border-2 '>
                            <div className="fs-2">{treinamento?.nome ?? 'Nome do treinamento'}</div>
                        </div>

                        {/* Datas */}
                        <div>
                            <div>Criado em {treinamento?.data_criacao ?? '00/00/0000'} por {treinamento?.criador ?? 'Criador'}</div>
                            <div className="text-muted">Atualizado em {treinamento?.data_atualizacao ?? '00/00/0000'} por {treinamento?.criador ?? 'Criador'}</div>
                        </div>

                        {/* Estado */}
                        <div>
                            <div className='mb-0 fs-5'>Estado</div>
                            <div className='ms-3 d-flex align-itens-center gap-2'>
                                <div>{treinamento?.estado && <EstadoTreinamento estado={treinamento.estado} />}</div>
                                <div>{treinamento?.estado}</div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div>
                            <div className='mb-0 fs-5'>Descrição</div>
                            <div className="ms-3 p-2 rounded" style={{ minHeight: '250px' }}>
                                {treinamento?.descricao ?? 'Sem Descrição'}
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-md-6 ps-md-3 d-flex flex-column gap-3">
                        {/* Participantes */}
                        <button className='btn btn-White d-flex border d-flex align-items-center'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                            <div>Ver Participantes</div>
                        </button>

                        {/* Alterar  */}
                        <button className='btn btn-White d-flex border '>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-short" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8" />
                            </svg>
                            <div>Alterar informações</div>
                        </button>
                    </div>

                    <div className="col-12 d-flex border-top pt-3 justify-content-between align-items-center">
                        {/* Botão voltar e logo */}
                        <div>
                            <a href="#" className="btn btn-azulGM">
                                <i className="bi bi-arrow-left-short"></i> Voltar ao painel de controle
                            </a>
                        </div>

                        <LogoGM tamanho={55} cor={'#0956FF'} />
                    </div>
                </div>

                {/* SIDEBAR */}
                {/* 
                <div className="col-md-4">
                    <div className="card mb-4">
                        <div className="card-header">Trocar nome do treinamento</div>
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Treinamento ..."
                                    />
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">Trocar descrição</div>
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <textarea
                                        className="form-control textarea-descricao"
                                        placeholder="Descrição ..."
                                    ></textarea>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="card mb-4">
                        <div className="card-header">Trocar Status</div>
                        <div className="card-body">
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <i className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></i>
                                    <a href="#">Concluído</a>
                                </li>
                                <li>
                                    <i className={`text-${Status["Em andamento"][0]} fa ${Status["Em andamento"][1]} col-2`}></i>
                                    <a href="#">Em andamento</a>
                                </li>
                                <li>
                                    <i className={`text-${Status.Cancelado[0]} fa ${Status.Cancelado[1]} col-2`}></i>
                                    <a href="#">Cancelado</a>
                                </li>
                                <li>
                                    <i className={`text-${Status.Pendente[0]} fa ${Status.Pendente[1]} col-2`}></i>
                                    <a href="#">Pendente</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div> 
                */}
            </div>

            <div className='container mt-5 py-5'>
                <div className='bg-white rounded shadow-sm overflow-hidden'>
                    <div className='col-12 d-flex'>
                        {/* Esquerda */}
                        <div className='col-md-5'>
                            <div className='contact-info h-100 d-flex flex-column justify-content-between'>
                                {/* Nome */}
                                <div className='fs-2'>{treinamento?.nome ?? 'Nome do treinamento'}</div>

                                {/* Descrição */}
                                <div className='border p-3 rounded' style={{ height: '300px' }}>{treinamento?.descricao ?? 'Descrição do treinamento'}</div>

                                {/* Logo */}
                                <div className=''><LogoGM cor={'#fff'} tamanho={55} /></div>
                            </div>
                        </div>

                        {/* Direita */}
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
    </>);
}
