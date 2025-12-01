'use client';

/*
  Página onde o FT ou ADM acessa determinado treinamento e pode realizar alterações nele.
  Nesta página podemos trocar o nome, descrição e status dos treinamentos 
*/

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

import LogoGM from '@/components/LogoGM';
import EstadoTreinamento from '@/components/EstadoTreinamento/page';
import Sessoes from '@/components/ft/sessoes';
import Swal from 'sweetalert2';


export default function Treinamento() {
    const { id } = useParams()

    const [treinamento, setTreinamento] = useState({});
    const [sessoes, setSessoes] = useState(null);
    const [usuario, setUsuario] = useState({});

    /* Função para carregar o treinamento */
    async function carregarTreinamento() {
        try {
            const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}`);
            const data = await res.json();

            if (data.sucesso) {
                setTreinamento(data.dados[0]);

                /* Carregando as sessões do treinamento */
                carregarSessoes();
            } else {
                console.log(data.mensagem);
            }
        } catch (err) {
            console.error('Erro ao carregar treinamento:', err);
        }

    }

    /* Carregando o treinamento */
    useEffect(() => {
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

    /* Função para carregar as sessões de um treinamento */
    async function carregarSessoes() {
        try {
            const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}/sessoes`);
            const data = await res.json();

            if (data.sucesso) {
                setSessoes(data.dados);
                console.log(data.dados);

            } else {
                console.log(data.mensagem);
            }
        } catch (err) {
            console.error('Erro ao carregar sessões:', err);
        }

    }

    // Função para criar uma nova sessão no treinamento
    function registrarSessao() { }

    function formatarData(data) {
        if (!data) return "--/--/---- - --:--";

        const d = new Date(data);
        if (isNaN(d)) return "--/--/---- - --:--";

        const dia = String(d.getDate()).padStart(2, "0");
        const mes = String(d.getMonth() + 1).padStart(2, "0");
        const ano = d.getFullYear();
        const horas = String(d.getHours()).padStart(2, "0");
        const minutos = String(d.getMinutes()).padStart(2, "0");

        return `${dia}/${mes}/${ano} às ${horas}:${minutos}`;
    }


    /* Modal para cancelar treinamento */
    function cancelarTreinamento() {
        Swal.fire({
            title: 'Confirmar Exclusão',
            html: `Deseja confirmar a exclusão do treinamento "${treinamento.nome}"?`,

            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#dc3545',

            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#adb5bd',

            preConfirm: async () => {
                const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}/atualizarEstado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ estado: 'Cancelado' })
                });
                const data = await res.json();
                
                return data.sucesso;
            }

        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Treinamento cancelado!");
                carregarTreinamento()
            }
        });
    }

    /* Modal para aprovar treinamento */
    function aprovarTreinamento() {
        Swal.fire({
            title: 'Confirmar Aprovação',
            html: `Deseja confirmar a aprovação do treinamento "${treinamento.nome}"?`,

            confirmButtonText: 'Confirmar',
            confirmButtonColor: '#0dcaf0',

            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            cancelButtonColor: '#adb5bd',

            preConfirm: async () => {
                const res = await fetch(`http://localhost:3000/api/treinamentos/treinamento/${id}/atualizarEstado`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ estado: 'Em andamento' })
                });
                const data = await res.json();

                return data.sucesso;
            }

        }).then((result) => {
            if (result.isConfirmed) {
                console.log("Treinamento aprovado!");
                carregarTreinamento()
            }
        });
    }

    if (treinamento && sessoes) return (<>
        <div className='container h-100 py-4 d-flex flex-column'>
            {/* Titulo da página*/}
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Gerenciador de Treinamento</h1></div>
            </div>

            {/* Corpo da página */}
            <div className='row row-gap-3'>
                {/* Informações do treinamento */}
                <div className='col-12 bg-white p-3 rounded shadow-sm d-flex flex-wrap row-gap-3'>
                    <div className='col-12 col-lg-6 pb-3 pb-lg-0 pe-md-3 d-flex flex-column gap-3 border-bottom'>
                        {/* Nome do treinamento */}
                        <div className='border-bottom border-2 '>
                            <div className='fs-2'>{treinamento.nome ?? 'Nome do treinamento'}</div>
                        </div>

                        {/* Datas */}
                        <div>
                            <div>Criado em {formatarData(treinamento.data_criacao) ?? '00/00/0000'}</div>
                            <div className='text-muted'>Atualizado em {formatarData(treinamento.data_atualizacao) ?? '00/00/0000'}</div>
                        </div>

                        {/* Criador */}
                        <div>
                            <div className='mb-0 fs-5'>Orientador</div>
                            <div className='ms-3 d-flex align-itens-center gap-2'>
                                <div>{treinamento.criador}</div>
                            </div>
                        </div>

                        {/* Estado */}
                        <div>
                            <div className='mb-0 fs-5'>Estado</div>
                            <div className='ms-3 d-flex align-itens-center gap-2'>
                                <div>{treinamento?.estado && <EstadoTreinamento estado={treinamento.estado} />}</div>
                                <div className='d-flex align-items-end fs-5 fw-bold'><span>{treinamento.estado}</span></div>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div>
                            <div className='mb-0 fs-5'>Descrição</div>
                            <div className='ms-3 p-2 rounded' style={{ minHeight: '200px' }}>
                                {treinamento?.descricao ?? 'Sem Descrição'}
                            </div>
                        </div>
                    </div>

                    <div className='col-12 col-lg-6 d-flex flex-column gap-3 border-lg border-bottom border p-3'>
                        {/* Participantes */}
                        <button className='btn btn-White d-flex border d-flex align-items-center'>
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8' />
                            </svg>
                            <div>Ver Participantes</div>
                        </button>

                        {/* Alterar dados */}
                        <button className='btn btn-White d-flex border '>
                            <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-arrow-right-short' viewBox='0 0 16 16'>
                                <path fillRule='evenodd' d='M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8' />
                            </svg>
                            <div>Alterar informações</div>
                        </button>
                    </div>

                    <div className='col-12 d-flex justify-content-between align-items-center'>
                        {/* Botões */}
                        <div className='d-flex gap-3 flex-wrap'>
                            <a href='/treinamentos' className='btn btn-azulGM'>
                                <i className='bi bi-arrow-left-short'></i> Voltar aos treinamentos
                            </a>

                            {
                                treinamento.estado === 'Pendente' &&
                                <div>
                                    <button className='btn btn-danger' onClick={cancelarTreinamento}>
                                        Cancelar Treinamento
                                    </button>
                                </div>
                            }

                            {
                                treinamento.estado === 'Pendente' &&
                                <div>
                                    <button className='btn btn-info text-white' onClick={aprovarTreinamento}>
                                        Aprovar Treinamento
                                    </button>
                                </div>
                            }
                        </div>

                        {/* Logo GM */}
                        <LogoGM tamanho={55} cor={'#0956FF'} />
                    </div>
                </div>

                {/* Sessões */}
                {
                    (treinamento.estado === 'Em andamento' || treinamento.estado === 'Concluido') &&
                    <div className='col-12 bg-white p-3 rounded shadow-sm d-flex flex-wrap row-gap-3'>
                        <Sessoes treinamento={treinamento} sessoes={sessoes} criador={false} registrarSessao={registrarSessao} />
                    </div>
                }
            </div>
        </div>
    </>);
}
