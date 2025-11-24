"use client";

/*
  Página onde o FT ou ADM acessa determinado treinamento e pode realizar alterações nele.
  Nesta página podemos trocar o nome, descrição e status dos treinamentos 
*/

import "./verTreinamento.css";
import { useState, useEffect } from "react";

export default function VerTreinamento() {

    const [usuario, setUsuario] = useState([]);
    const [dataCriacao, setDataCriacao] = useState("");

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

        // PEGAR A DATA ATUAL FORMATADA
        const hoje = new Date();
        const dataFormatada = hoje.toLocaleDateString("pt-BR");  
        setDataCriacao(dataFormatada);

    }, []);

    const Status = {
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };

    return (
        <>
            <main className="container">
                <h1>Gerenciador de Treinamento</h1>
                <div className="row">

                    <div className="col-md-8 shadow-sm">
                        <article className="blog-post mb-4">
                            <h2 className="blog-post-title">#Nome Treinamento</h2>
                            <p className="blog-post-meta">
                                {dataCriacao} — <a href="#">{usuario?.nome}</a>
                            </p>
                            <img
                                src="https://via.placeholder.com/800x400"
                                alt="Imagem do Status do Treinamento grande"
                                className="img-fluid mb-3"
                            />
                            <p>
                                #Descrição do treinamento
                            </p>

                            <div className="botaoLogo">
                                <a href="#" className="btn btn-primary">
                                    Voltar ao painel de controle
                                </a>

                                <svg width="55" height="55" alt="GM Logo" title="GM" viewBox="0 0 54 55">
                                    <path d="M24.6285 40.4839H43.9691V37.0484H24.6285V40.4839ZM50.5549 46.4516V8.54839C50.5549 5.51613 48.9846 3.93548 45.9401 3.93548H8.04392C4.99941 3.93548 3.42908 5.51613 3.42908 8.54839V46.4032C3.42908 49.4355 4.99941 51.0161 8.04392 51.0161H45.892C48.9846 51.0645 50.5549 49.5 50.5549 46.4677V46.4516Z" fill="#0956FF"></path>
                                </svg>
                            </div>

                        </article>
                    </div>

                    {/* SIDEBAR */}
                    <div className="col-md-4">

                        {/* Card Nome */}
                        <div className="card mb-4">
                            <div className="card-header">Trocar nome:</div>
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

                        {/* Card Status */}
                        <div className="card mb-4">
                            <div className="card-header">Trocar Status:</div>
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

                        {/* Card Descrição corrigido */}
                        <div className="card mb-4">
                            <div className="card-header">Trocar descrição:</div>
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

                    </div>
                </div>
            </main>
        </>
    );
}
