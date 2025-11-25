'use client'

import Calendario from "@/components/calendario";
/*
    Página para que o usuário tenha controle sobre seus treinamentos e sessões
        • Exibir os treinamentos do usuário
        • Exibir as próximas sessões do usuário
        • Caso o usuário seja o criador do treinamento, permitir que ele controle o treinamento
*/

import EstadoTreinamento from "@/components/EstadoTreinamento/page";
import { useState, useEffect } from "react";

export default function treinamentos() {
    const [usuario, setUsuario] = useState([]);
    const [treinamentosOferecidos, setTreinamentosOferecidos] = useState([]);
    const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
    const [treinamentosExibidos, setTreinamentosExibidos] = useState([]);
    const [opcaoExibir, setOpcaoExibir] = useState('Realizados');
    const [sessoes, setSessoes] = useState()

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


    return (<>
        <div className="container py-4">
            {/* Titulo da página*/}
            <div className="d-flex flex-column justify-content-between mb-3">
                <div className="bottom-bordaAzulGM ps-3 col-12">
                    <h1 className="h3 mb-0 fw-bold fs-2">Seus treinamentos</h1>
                </div>
            </div>

            {/* Corpo da página */}
            <div className="col-12 d-flex flex-wrap row-gap-3">
                {/* Próximas sessões */}
                <div className="col-12 col-lg-6 pe-lg-2">
                    <div className="col-12 bg-white shadow-sm p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Sessao'} />
                            <h5 className="mb-0 fs-5">Próximas sessões</h5>
                        </div>

                        {/* <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome treinamento</div>
                                <div>00/00/0000 - 00:00</div>
                            </div>
                        </div> */}

                        <Calendario />
                    </div>
                </div>

                {/* Treinamentos em andamento */}
                <div className="col-12 col-lg-6 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Em andamento'} />
                            <h5 className="mb-0 fs-5">Treinamentos em andamento</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>

                            {treinamentosExibidos.filter((tr) => tr.estado === 'Em andamento').map((tr) =>
                                <div className="border rounded p-3 mt-2" key={tr.id}>
                                    <div>Nome do treinamento</div>
                                    <div>Nome do tutor</div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Treinamentos pendentes */}
                <div className="col-12 col-lg-4 pe-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Pendente'} />
                            <h5 className="mb-0 fs-5">Treinamentos pendentes</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>

                            {treinamentosExibidos.filter((tr) => tr.estado === 'Pendente').map((tr) =>
                                <div className="border rounded p-3 mt-2" key={tr.id}>
                                    <div>Nome do treinamento</div>
                                    <div>Nome do tutor</div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Treinamentos passados */}
                <div className="col-12 col-lg-4 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Concluido'} />
                            <h5 className="mb-0 fs-5">Treinamentos concluidos</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>

                            {treinamentosExibidos.filter((tr) => tr.estado === 'Concluido').map((tr) =>
                                <div className="border rounded p-3 mt-2" key={tr.id}>
                                    <div>Nome do treinamento</div>
                                    <div>Nome do tutor</div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

                {/* Treinamentos cancelados */}
                <div className="col-12 col-lg-4 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Cancelado'} />
                            <h5 className="mb-0 fs-5">Treinamentos cancelados</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>

                            {treinamentosExibidos.filter((tr) => tr.estado === 'Cancelado').map((tr) =>
                                <div className="border rounded p-3 mt-2" key={tr.id}>
                                    <div>Nome do treinamento</div>
                                    <div>Nome do tutor</div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </>);
}

{/* 
    <div className="col-12 d-flex bg-white shadow p-3 rounded">
        <div className="col-12 pe-md-2">
            <div className='col-12 col-md-6'>
                <h5 className="mb-0 fs-5">Certificados</h5>
            </div>
            <div className="col-12 border rounded p-3 overflow-x-scroll">
                <div className="border rounded p-3" style={{width: '300px', height:'300px'}}>
                    <div>Nome do treinamento</div>
                    <div>Finalizado em: 00/00/0000</div>
                    <div>Tutor: Nome do tutor</div>
                    <div>Emitido em: 00/00/0000</div>
                </div>
            </div>
        </div>
    </div>
*/}