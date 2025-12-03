'use client';

import './treinamentos.css'
import { useEffect, useState } from 'react';

export default function Treinamentos() {

    const [usuario, setUsuario] = useState(null);

    const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
    const [treinamentosOfertados, setTreinamentosOfertados] = useState([]);
    const [exibir, setExibir] = useState("Realizados");

    const [pagina, setPagina] = useState(1);
    const [totalPaginas, setTotalPaginas] = useState(1)

    const Status = {
        'Pendente': ['primary', 'fa-question-circle'],
        'Em andamento': ['warning', 'fa-cogs'],
        'Concluido': ['success', 'fa-check'],
        'Cancelado': ['danger', 'fa-xmark'],
    };

    /* Carregando o usuário logado */
    useEffect(() => {
        async function carregarUsuario() {
            const res = await fetch("http://localhost:3000/api/auth/perfil", {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (data.sucesso) {
                setUsuario(data.dados);
            }
        }

        carregarUsuario();
    }, []);

    /* Carregando os treinamentos do usuário */
    useEffect(() => {
        async function carregarTreinamentos() {

            // Treinamentos realizados
            const resRealizados = await fetch(`http://localhost:3000/api/treinamentos/participante/${usuario.id}?pagina=${pagina}`);
            const dataRealizados = await resRealizados.json();
            if (dataRealizados.sucesso) {
                setTreinamentosRealizados(dataRealizados.dados.treinamentos);
                setTotalPaginas(dataRealizados.dados.totalPaginas);
            }

            // Treinamentos ofertados (criados pelo usuário)
            const resOfertados = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}?pagina=${pagina}`);
            const dataOfertados = await resOfertados.json();
            if (dataOfertados.sucesso) {
                setTreinamentosOfertados(dataOfertados.dados.treinamentos);
                setTotalPaginas(dataRealizados.dados.totalPaginas);
            }
        }

        if (usuario)
            carregarTreinamentos();
    }, [usuario]);

    /* Carregando os treinamentos do usuário ao mudar a página */
    useEffect(() => {
        if (!usuario?.id) return;

        async function carregarTreinamentos() {

            // Treinamentos realizados
            if (exibir === 'Realizados') {
                const resRealizados = await fetch(`http://localhost:3000/api/treinamentos/participante/${usuario.id}?pagina=${pagina}`);
                const dataRealizados = await resRealizados.json();
                if (dataRealizados.sucesso) {
                    setTreinamentosRealizados(dataRealizados.dados.treinamentos);
                    setTotalPaginas(dataRealizados.dados.totalPaginas);
                }
            }
            else {
                // Treinamentos ofertados (criados pelo usuário)
                const resOfertados = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}?pagina=${pagina}`);
                const dataOfertados = await resOfertados.json();
                if (dataOfertados.sucesso) {
                    setTreinamentosOfertados(dataOfertados.dados.treinamentos);
                    setTotalPaginas(dataOfertados.dados.totalPaginas);
                }
            }
        }

        carregarTreinamentos();
    }, [pagina, exibir]);

    /* Controlando o valor da página */
    useEffect(() => {
        // Impedindo que o usuário vá para páginas antes de 1
        if (pagina < 1) {
            setPagina(1)
        }

        // Impedindo que o valor vá para páginas maiores que a página final
        if (pagina > totalPaginas) {
            setPagina(totalPaginas)
        }
    }, [pagina])


    // Treinamentos exibidos conforme a opção
    const lista = exibir === "Realizados" ? treinamentosRealizados : treinamentosOfertados;

    function botoesPaginacao() {
        const botoes = [];

        let inicio, fim;

        if (pagina <= 3 || totalPaginas === 0) {
            inicio = 1;
            fim = 5;
        } else {
            inicio = (pagina - 2) <= (totalPaginas - 4) ? (pagina - 2) : (totalPaginas - 4);
            fim = (pagina + 2) <= totalPaginas ? (pagina + 2) : totalPaginas;
        }

        if (fim > totalPaginas) fim = totalPaginas;
        if (inicio < 1) inicio = 1;


        botoes.push(<button key={'anterior'} className="btn border rounded-0 btnPaginacao" onClick={e => setPagina(pagina - 1)}
            disabled={(pagina === 1) || (totalPaginas === 0)}
        >
            Anterior
        </button>)

        for (let i = inicio; i <= fim; i++) {
            botoes.push(
                <button
                    key={i}
                    className={`btn border rounded-0 ${(i === pagina) ? 'bg-secondary-subtle' : ''} btnPaginacao`}
                    onClick={() => setPagina(i)}
                    style={{ width: '3rem' }}
                >
                    {i}
                </button>
            );
        }

        botoes.push(<button key={'proximo'} className="btn border rounded-0 btnPaginacao" onClick={e => setPagina(pagina + 1)}
            disabled={(pagina === totalPaginas) || (totalPaginas === 0)}>
            Próximo
        </button>)

        return botoes;
    }


    if (usuario) return (
        <div className='container h-100 py-4 d-flex flex-column'>
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'>
                    <h1 className='h3 mb-0 fw-bold fs-2'>Treinamentos</h1>
                </div>
            </div>

            <div className='flex-grow-1 d-flex flex-column'>

                <div className='bg-white shadow-sm p-3 rounded flex-grow-1 d-flex flex-column gap-3'>

                    {/* Botões */}
                    <div className='card-header bg-white border-0 px-0 d-flex flex-wrap row-gap-2'>

                        {/* Botões Realizados/Oferecidos */}
                        <div className='col-12 col-md-6 pe-md-2'>
                            <button
                                className={`col-12 col-sm-6 btn border rounded-0 btn-filtro btnPaginacao ${exibir === 'Realizados' ? 'active' : ''}`}
                                onClick={() => setExibir("Realizados")}
                            >
                                Realizados
                            </button>

                            <button
                                className={`col-12 col-sm-6 btn border rounded-0 btn-filtro btnPaginacao ${exibir === 'Ofertados' ? 'active' : ''}`}
                                onClick={() => setExibir("Ofertados")}
                                disabled={usuario.tipo === 'mt'}
                            >
                                Ofertados
                            </button>
                        </div>



                        {/* PAGINAÇÃO */}
                        <div className='col-12 col-md-6 d-flex justify-content-md-end justify-content-center'>
                            {botoesPaginacao()}
                        </div>
                    </div>

                    {/* Tabela */}
                    <div className='col-12 border flex-grow-1 p-3 overflow-y-scroll'>
                        <table className='table user-list'>
                            <thead>
                                <tr>
                                    <th><span>Nome</span></th>
                                    <th><span>Criado em</span></th>
                                    <th className='text-center'><span>Status</span></th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>

                            <tbody>

                                {lista.length === 0 && (
                                    <tr>
                                        <td colSpan="4" className='text-center py-3'>
                                            Nenhum treinamento encontrado.
                                        </td>
                                    </tr>
                                )}

                                {lista.map((tr) => (
                                    <tr key={tr.id}>
                                        <td>
                                            <a href={`${usuario.tipo}/treinamento/${tr.id}`} className='user-link'>
                                                {tr.nome}
                                            </a>
                                        </td>

                                        <td>{new Date(tr.data_criacao).toLocaleDateString()}</td>

                                        <td className='text-center'>
                                            <span className={`text-${Status[tr.estado][0]} fa ${Status[tr.estado][1]} me-2`}></span>
                                            {tr.estado}
                                        </td>

                                        <td style={{ width: '20%' }}>
                                            <a href={`${usuario.tipo}/treinamento/${tr.id}`} className='btn btn-azulGM'>
                                                <span className='fa-stack'>
                                                    {/* <i className='fa fa-square fa-stack-2x' /> */}
                                                    <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                                </span>
                                                Ver Treinamento
                                            </a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}