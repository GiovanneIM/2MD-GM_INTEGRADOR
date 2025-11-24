'use client'

/* 
    Página de perfil do usuário;
        • Exibir as informações do usuário
        • Permitir que o usuário altere as informações dele
*/

import { useState, useEffect } from "react";

import LogoGM from "@/components/LogoGM"
import "./configuracoes.css"

export default function Configuracoes() {
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

    return (<>
        <div className="container py-5">

            {/* Cabeçalho */}
            <div className="col-12 mb-4">

                <div className="profile-header position-relative mb-4">
                    <div className="position-absolute top-0 end-0 p-3">
                        <LogoGM tamanho={80} cor={"#0956FF"} />
                    </div>
                </div>

                <div className="text-center">

                    {/* Foto de perfil */}
                    <div className="position-relative d-inline-block">
                        <img
                            src="https://tse4.mm.bing.net/th/id/OIP.dvPzAHlp_Tttshx0Th7yiQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3"
                            className="rounded-circle profile-pic"
                            alt="#Imagem"
                        />
                        <button className="btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle">
                            <i className="fas fa-camera" />
                        </button>
                    </div>

                    {/* Nome */}
                    <h3 className="mt-3 mb-1">{usuario.nome}</h3>

                    {/* Cargo */}
                    <p className="text-muted mb-3">{
                        usuario.tipo === 'mt'
                            ? 'Membro de time'
                            : usuario.tipo === 'ft'
                                ? 'Facilitador de time'
                                : 'Administrador'
                    }</p>

                    {/* Mensagem */}
                    <div className="d-flex justify-content-center gap-2 mb-4">
                        <button
                            className="btn btn-azulGM"
                            type="button"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                            data-bs-whatever="@getbootstrap"
                        >
                            <i className="fas fa-envelope me-2" />
                            Enviar mensagem
                        </button>
                    </div>
                </div>
            </div>

            {/* conteúdo Principal */}
            <div className="col-12 d-flex flex-column flex-md-row row-gap-3">
                {/* Informaçõs Pessoais */}
                <div className="col-12 col-md-6 pe-md-2">
                    <div className="col-12 d-flex flex-column flex-wrap bg-white shadow rounded p-3">
                        <h5 className="mb-4">Informaçõs Pessoais</h5>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <div>Nome</div>
                                <div style={{height: '24px'}}>{usuario.nome}</div>
                            </div>
                            <div className="col-md-6">
                            </div>
                            <div className="col-md-6">
                                <div>Email</div>
                                <div style={{height: '24px'}}>{usuario.email}</div>
                            </div>
                            <div className="col-md-6">
                                <div>Telefone</div>
                                <div style={{height: '24px'}}>{usuario.telefone}</div>
                            </div>

                            <div className="col-12">
                                <div>Bio</div>
                                <div
                                    className="border rounded"
                                    style={{ height: '120px' }}
                                >
                                    {usuario.bio}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cofigurações do Cards */}
                {/* <div className="row g-4 mb-4">
                            <div className="col-md-6">
                                <div className="settings-card card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">
                                                    Autenticação de dois fatores
                                                </h6>
                                                <p className="text-muted mb-0 small">
                                                    Adicione uma nova camada de segurança
                                                </p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultChecked=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="settings-card card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-between align-items-center">
                                            <div>
                                                <h6 className="mb-1">Email Notificações</h6>
                                                <p className="text-muted mb-0 small">
                                                    Receba notificações de atividade
                                                </p>
                                            </div>
                                            <div className="form-check form-switch">
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    defaultChecked=""
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> */}

                {/* Atividade recente */}
                <div className="col-12 col-md-6 ps-md-2">
                    <div className="col-12 d-flex flex-column flex-wrap bg-white shadow rounded p-3">
                        <h5 className="mb-5">Atividade Recente</h5>
                        <div className="activity-item mb-3">
                            <h6 className="mb-1">#Atividade</h6>
                            <p className="text-muted small mb-0">#Tempo</p>
                        </div>
                        <div className="activity-item mb-3">
                            <h6 className="mb-1">#Atividade</h6>
                            <p className="text-muted small mb-0">#Tempo</p>
                        </div>
                        <div className="activity-item">
                            <h6 className="mb-1">#Atividade</h6>
                            <p className="text-muted small mb-0">#Tempo</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        {/* Modal Mensagem */}
        < div
            className="modal fade"
            id="exampleModal"
            tabIndex={- 1
            }
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
        >
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">
                            Nova mensagem
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                        />
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="recipient-nome" className="col-form-label">
                                    Nome:
                                </label>
                                <input type="text" className="form-control" id="recipient-nome" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="mensagem-text" className="col-form-label">
                                    Mensagem:
                                </label>
                                <textarea
                                    className="form-control"
                                    id="mensagem-text"
                                    defaultValue={""}
                                />
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary">
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div >
    </>)
}