"use client";

/*
  Página onde o FT ou ADM acessa determinado treinamento e pode realizar alteraçõed nele.
  Nesta página podemos trocar o nome, descrição e status dos treinamentos 
*/


import "./verTreinamento.css"

import { useState, useEffect } from "react";


export default function VerTreinamento() {

    const [usuario, setUsuario] = useState([]);


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


    // Objeto para as cores do estado
    const Status = {
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };


    return (<>

        {/* Main Content */}
        <main className="container">
            <h1>Gerenciador de Treinamento</h1>
            <div className="row">
                {/* Blog Posts */}
                <div className="col-md-8 shadow-sm">
                    {/* Blog Post 1 */}
                    <article className="blog-post mb-4">
                        <h2 className="blog-post-title">#Nome Treinamento</h2>
                        <p className="blog-post-meta">
                            #Data de quando foi criado <a href="#">{usuario?.nome}</a>
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

                            <svg width="55" height="55" alt="GM Logo" title="GM" viewBox="0 0 54 55" fill="none" xmlns="http://www.w3.org/2000/svg" data-di-res-id="a27f4106-d12b074b" data-di-rand="1762433650408">
                                <path d="M24.6285 40.4839H43.9691V37.0484H24.6285V40.4839ZM50.5549 46.4516V8.54839C50.5549 5.51613 48.9846 3.93548 45.9401 3.93548H8.04392C4.99941 3.93548 3.42908 5.51613 3.42908 8.54839V46.4032C3.42908 49.4355 4.99941 51.0161 8.04392 51.0161H45.892C48.9846 51.0645 50.5549 49.5 50.5549 46.4677V46.4516ZM53.984 46.7903C53.984 51.4516 50.9395 54.5 46.2766 54.5H7.70742C3.04451 54.5 0 51.4677 0 46.7903V8.20968C0 3.53226 3.04451 0.5 7.70742 0.5H46.2926C50.9555 0.5 54 3.53226 54 8.20968V46.7903H53.984ZM17.7223 17.8871H15.527C14.6777 17.8387 14.0047 18.5 13.9567 19.2903V28.1774C13.8926 29.0161 14.5816 29.7581 15.4148 29.7581H17.7223V17.8871ZM21.6641 14.5161V33.9839C21.6641 36.2903 20.6546 40.5161 13.9567 40.5161H12.3223V37.0806H13.9567C16.6006 37.0323 17.6742 35.9032 17.7223 33.9839V33.1936H14.4053C12.0979 33.3065 10.127 31.5645 10.0148 29.2581V18.9032C10.0148 16.2581 11.7614 14.5161 14.4053 14.5161H21.6641ZM43.9852 18.9032V33.1936H40.0433V19.4677C40.1074 18.6774 39.4825 17.9516 38.6973 17.8871H36.2777V33.1774H32.3359V17.8871H28.5703V33.1774H24.6285V14.5H39.5947C42.3507 14.5 43.9852 16.1935 43.9852 18.8871V18.9032Z" fill="#0956FF"></path>
                            </svg>
                        </div>

                    </article>
                </div>
                {/* Sidebar */}
                <div className="col-md-4">
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
                    <div className="cardDescricao">
                        <div className="card-header">Trocar descrição:</div>
                        <div className="card-body">
                            <form>
                                <div className="input-group">
                                    <textarea
                                        className="form-control"
                                        placeholder="Descrição ...">

                                    </textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>

    </>)
}