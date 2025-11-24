'use client'

import { useEffect, useState } from "react";
import TreinamentosItem from "./TreinamentoItem";
import './trLista.css';

export default function TreinamentosLista({
    treinamentosRealizados,
    treinamentosOfertados,
    tipoUsuario
}) {
    const [filtroRO, setFiltroRO] = useState('Realizados');
    const [filtro, setFiltro] = useState('');
    const [treinamentos, setTreinamentos] = useState([]);
    const [trExibir, setTrExibir] = useState([]);

    useEffect(() => {
        setTreinamentos(treinamentosRealizados)
        setTrExibir(treinamentosRealizados)
    }, [treinamentosRealizados])


    /* Objeto para as cores do estado */
    const Status = {
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };

    /* Função para filtrar treinamentos por estado */
    function FiltrarTreinamentos(estado) {
        estado
            ? setTrExibir(treinamentos.filter(tr => tr.estado === estado))
            : setTrExibir(treinamentos);
    }


    return (
        <div className="col-12">
            <div className="col-12 card border-0 shadow-sm p-3">

                {/* Título */}
                <div className="card-header bg-white border-0 px-0 d-flex flex-wrap">
                    <div className='col-12 col-md-6'>
                        <h5 className="mb-0 fs-5">Treinamentos</h5>
                    </div>

                    {/* Botões de Realizado e Ofertados */}
                    <button
                        className={`col-12 col-sm-6 col-md-3 btn border rounded-0 btn-filtro ${filtroRO === 'Realizados' ? 'btn-ativo' : ''}`}
                        onClick={() => {
                            setTreinamentos(treinamentosRealizados);
                            setFiltroRO('Realizados');
                            setFiltro('');
                            setTrExibir(treinamentosRealizados)
                        }}
                    >Realizados
                    </button>

                    {
                        tipoUsuario === 'mt' ? (
                            <button
                                className={`col-12 col-sm-6 col-md-3 btn border rounded-0 bg-secondary bg-opacity-50`}
                                disabled
                            >Ofertados
                            </button>
                        ) : (
                            <button
                                className={`col-12 col-sm-6 col-md-3 btn border rounded-0 btn-filtro ${filtroRO === 'Ofertados' ? 'btn-ativo' : ''}`}
                                onClick={() => {
                                    setTreinamentos(treinamentosOfertados);
                                    setFiltroRO('Ofertados');
                                    setFiltro('');
                                    setTrExibir(treinamentosOfertados);
                                }}
                            >Ofertados
                            </button>
                        )
                    }

                </div>

                {/* Botões de filtro */}
                <div className="col-12 d-flex flex-wrap">{
                    // Criando 1 botão para cada estado
                    Object.keys(Status).map((estado) => {
                        // Verificando se o filtro está ativo para esse botão
                        const ativo = filtro === estado;

                        // Classes do botão
                        const classes = 'btn btn-filtro border rounded-0 col-12 col-sm-6 col-md-3';
                        const classeAtivo = ativo ? `border-${Status[estado][0]} bg-${Status[estado][0]} bg-opacity-10` : '';

                        // Criando o botão
                        return (
                            <button
                                key={estado}
                                className={classes + ' ' + classeAtivo}
                                onClick={() => {
                                    const novoEstado = ativo ? '' : estado;
                                    setFiltro(novoEstado);
                                    FiltrarTreinamentos(novoEstado);
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                {estado}
                            </button>
                        );
                    })
                }</div>

                {/* Lista */}
                <div
                    className={
                        'card-body border overflow-y-scroll ' +
                        (filtro ? `border-${Status[filtro][0]} bg-${Status[filtro][0]} bg-opacity-10` : '')
                    }
                    style={{ height: '500px' }}
                >
                    {trExibir.length > 0 ? (
                        trExibir.map(tr => <TreinamentosItem tr={tr} key={tr.id} />)
                    ) : (
                        <div className="h-100 gap-3 d-flex flex-column justify-content-center align-items-center">
                            <p className="text-muted">Sem treinamentos</p>
                        </div>
                    )}
                </div>

                {/* Total de treinamentos com um estado específico */}
                <div className="d-flex flex-wrap row-gap-3 mt-3">
                    {
                        Object.keys(Status).map((estado, index) => {
                            // Calculando o número de treinamentos com o estado determinado
                            const numeroTreinamentos = treinamentos.filter(tr => tr.estado === estado).length;

                            // Criando o botão
                            return (
                                <div key={index} className="col-md-6 d-flex gap-2 align-items-center">
                                    <div className={`bg-${Status[estado][0]} bg-opacity-10 rounded d-flex justify-content-center align-items-center`} style={{ height: '2.5rem', width: '2.5rem' }}>
                                        <i className={`fas ${Status[estado][1]} text-${Status[estado][0]}`} />
                                    </div>
                                    <div>
                                        {numeroTreinamentos}
                                        {numeroTreinamentos === 1 ? ' treinamento ' : ' treinamentos '}
                                        {numeroTreinamentos === 1 ? estado.toLowerCase() : estado.toLowerCase() + 's'}
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>

            </div>
        </div >
    );
}
