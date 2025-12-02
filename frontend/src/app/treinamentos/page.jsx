'use client';

import './treinamentos.css'
import { useEffect, useState } from 'react';

export default function Treinamentos() {

    const [usuario, setUsuario] = useState(null);

    const [treinamentosRealizados, setTreinamentosRealizados] = useState([]);
    const [treinamentosOfertados, setTreinamentosOfertados] = useState([]);
    const [exibir, setExibir] = useState("Realizados");

    const [pagina, setPagina] = useState(1);

    const Status = {
        'Pendente': ['primary', 'fa-question-circle'],
        'Em andamento': ['warning', 'fa-cogs'],
        'Concluido': ['success', 'fa-check'],
        'Cancelado': ['danger', 'fa-xmark'],
    };

    useEffect(() => {
        async function carregarUsuario() {
            const res = await fetch("http://localhost:3000/api/auth/perfil", {
                headers: {
                    "Authorization": "Bearer " + sessionStorage.getItem("token"),
                },
            });

            const data = await res.json();
            if (data.sucesso) {
                console.log(usuario);
                
                setUsuario(data.dados);
            }
        }

        carregarUsuario();
    }, []);

    /* Buscando os treinamentos do usuário */
    useEffect(() => {
        if (!usuario?.id) return;

        async function carregarTreinamentos() {

            // Treinamentos realizados
            const resRealizados = await fetch(`http://localhost:3000/api/treinamentos/participante/${usuario.id}/${pagina}`);
            const dadosRealizados = await resRealizados.json();
            if (dadosRealizados.sucesso) setTreinamentosRealizados(dadosRealizados.dados);

            // Treinamentos ofertados (criados pelo usuário)
            const resOfertados = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}/${pagina}`);
            const dadosOfertados = await resOfertados.json();
            if (dadosOfertados.sucesso) setTreinamentosOfertados(dadosOfertados.dados);
        }

        carregarTreinamentos();
    }, [usuario]);

    /* Buscando os treinamentos do usuário ao mudar a página */
    useEffect(() => {
        if (!usuario?.id) return;

        async function carregarTreinamentos() {

            // Treinamentos realizados
            if (exibir === 'Realizados') {
                const resRealizados = await fetch(`http://localhost:3000/api/treinamentos/${usuario.id}`);
                const dadosRealizados = await resRealizados.json();
                if (dadosRealizados.sucesso) setTreinamentosRealizados(dadosRealizados.dados);
            }
            else {
                // Treinamentos ofertados (criados pelo usuário)
                const resOfertados = await fetch(`http://localhost:3000/api/treinamentos/criador/${usuario.id}/${pagina}`);
                const dadosOfertados = await resOfertados.json();
                if (dadosOfertados.sucesso) setTreinamentosOfertados(dadosOfertados.dados);
            }
        }

        carregarTreinamentos();
    }, [pagina]);

    /* Controlando o valor da página */
    useEffect(() => {
        // Impedindo que o usuário vá para páginas antes de 1
        if (pagina < 1) {
            setPagina(1)
        }
    }, [pagina])


    // Treinamentos exibidos conforme a opção
    const lista = exibir === "Realizados" ? treinamentosRealizados : treinamentosOfertados;

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
                                className={`col-12 col-sm-6 btn border rounded-0 btn-filtro ${exibir === 'Realizados' ? 'active' : ''}`}
                                onClick={() => setExibir("Realizados")}
                            >
                                Realizados
                            </button>

                            <button
                                className={`col-12 col-sm-6 btn border rounded-0 btn-filtro ${exibir === 'Ofertados' ? 'active' : ''}`}
                                onClick={() => setExibir("Ofertados")}
                                disabled={usuario.tipo === 'mt'}
                            >
                                Ofertados
                            </button>
                        </div>

                        {/* Botões paginação */}
                        <div className='col-12 col-md-6 d-flex justify-content-md-end justify-content-center'>
                            <button className="btn border rounded-0" onClick={e => setPagina(pagina - 1)} disabled={pagina === 1}>Anterior</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(1)} style={{ width: '3rem' }}>1</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(2)} style={{ width: '3rem' }}>2</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(3)} style={{ width: '3rem' }}>3</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(4)} style={{ width: '3rem' }}>4</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(5)} style={{ width: '3rem' }}>5</button>
                            <button className="btn border rounded-0" onClick={e => setPagina(pagina + 1)} disabled={lista.length < 10}>Próximo</button>
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