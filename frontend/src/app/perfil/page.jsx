'use client'

import { useState, useEffect } from 'react';

import LogoGM from '@/components/LogoGM'
import './configuracoes.css'

export default function Configuracoes() {

    const [usuario, setUsuario] = useState({});
    const [editandoUsuario, setEditandoUsuario] = useState({});
    const [editando, setEditando] = useState(false);

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
                setEditandoUsuario(data.dados);
            }
        }

        carregarUsuario();
    }, [])

    /* Função para salvar alterações */
    async function salvarAlteracoes() {
        const res = await fetch('http://localhost:3000/api/auth/atualizarPerfil', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(editandoUsuario)
        });

        const data = await res.json();

        if (data.sucesso) {
            setUsuario(editandoUsuario);
            setEditando(false);
            alert("Perfil atualizado com sucesso!");
        } else {
            alert("Erro ao atualizar o perfil!");
        }
    }

    return (<>
        <div className='container py-5'>

            {/* Cabeçalho */}
            <div className='col-12 mb-4'>
                <div className='profile-header position-relative mb-4'>
                    <div className='position-absolute top-0 end-0 p-3'>
                        <LogoGM tamanho={80} cor={'#0956FF'} />
                    </div>
                </div>

                <div className='text-center'>

                    {/* Foto */}
                    <div className='position-relative d-inline-block'>
                        <img
                            src='https://tse4.mm.bing.net/th/id/OIP.dvPzAHlp_Tttshx0Th7yiQHaHa?cb=ucfimgc2&rs=1&pid=ImgDetMain&o=7&rm=3'
                            className='rounded-circle profile-pic'
                            alt='#Imagem'
                        />
                        <button className='btn btn-primary btn-sm position-absolute bottom-0 end-0 rounded-circle'>
                            <i className='fas fa-camera' />
                        </button>
                    </div>

                    {/* Nome */}
                    <h3 className='mt-3 mb-1'>
                        {usuario.nome}
                    </h3>

                    {/* Cargo */}
                    <p className='text-muted mb-3'>{
                        usuario.tipo === 'mt'
                            ? 'Membro de time'
                            : usuario.tipo === 'ft'
                                ? 'Facilitador de time'
                                : 'Administrador'
                    }</p>

                    {/* Botão mensagem */}
                    <div className='d-flex justify-content-center gap-2 mb-4'>
                        <button
                            className='btn btn-azulGM'
                            type='button'
                            data-bs-toggle='modal'
                            data-bs-target='#exampleModal'
                        >
                            <i className='fas fa-envelope me-2' />
                            Enviar mensagem
                        </button>
                    </div>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <div className='col-12 d-flex flex-column flex-md-row row-gap-3'>

                {/* Informações pessoais */}
                <div className='col-12 col-md-6 pe-md-2'>
                    <div className='col-12 d-flex flex-column bg-white shadow rounded p-3'>

                        <div className="d-flex justify-content-between mb-3">
                            <h5>Informações Pessoais</h5>
                        </div>

                        <div className='row g-3'>

                            {/* Nome */}
                            <div className='col-md-6'>
                                <div>Nome</div>

                                {!editando ? (
                                    <div style={{ height: '24px' }}>
                                        {usuario.nome}
                                    </div>
                                ) : (
                                    <input
                                        className="form-control"
                                        value={editandoUsuario.nome}
                                        onChange={e =>
                                            setEditandoUsuario({ ...editandoUsuario, nome: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            <div className='col-md-6'></div>

                            {/* Email */}
                            <div className='col-md-6'>
                                <div>Email</div>

                                {!editando ? (
                                    <div style={{ height: '24px' }}>
                                        {usuario.email}
                                    </div>
                                ) : (
                                    <input
                                        className="form-control"
                                        value={editandoUsuario.email}
                                        onChange={e =>
                                            setEditandoUsuario({ ...editandoUsuario, email: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            {/* Telefone */}
                            <div className='col-md-6'>
                                <div>Telefone</div>

                                {!editando ? (
                                    <div style={{ height: '24px' }}>
                                        {usuario.telefone}
                                    </div>
                                ) : (
                                    <input
                                        className="form-control"
                                        value={editandoUsuario.telefone}
                                        onChange={e =>
                                            setEditandoUsuario({ ...editandoUsuario, telefone: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            {/* Bio */}
                            <div className='col-12'>
                                <div>Bio</div>

                                {!editando ? (
                                    <div className='border rounded p-2' style={{ minHeight: '120px' }}>
                                        {usuario.bio}
                                    </div>
                                ) : (
                                    <textarea
                                        className="form-control"
                                        style={{ minHeight: '120px' }}
                                        value={editandoUsuario.bio}
                                        onChange={e =>
                                            setEditandoUsuario({ ...editandoUsuario, bio: e.target.value })
                                        }
                                    />
                                )}
                            </div>

                            {!editando ? (
                                <button className="btn btn-primary col-2" onClick={() => setEditando(true)}>
                                    Editar
                                </button>
                            ) : (
                                <button className="btn btn-success col-2" onClick={salvarAlteracoes}>
                                    Salvar
                                </button>
                            )}

                        </div>

                    </div>
                </div>

                {/* Atividade recente */}
                <div className='col-12 col-md-6 ps-md-2'>
                    <div className='col-12 d-flex flex-column bg-white shadow rounded p-3'>
                        <h5 className='mb-5'>Atividade Recente</h5>

                        <div className='activity-item mb-3'>
                            <h6 className='mb-1'>#Atividade</h6>
                            <p className='text-muted small mb-0'>#Tempo</p>
                        </div>

                        <div className='activity-item mb-3'>
                            <h6 className='mb-1'>#Atividade</h6>
                            <p className='text-muted small mb-0'>#Tempo</p>
                        </div>

                        <div className='activity-item'>
                            <h6 className='mb-1'>#Atividade</h6>
                            <p className='text-muted small mb-0'>#Tempo</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        {/* Modal Mensagem */}
        <div
            className='modal fade'
            id='exampleModal'
            tabIndex={-1}
            aria-hidden='true'
        >
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Nova mensagem</h5>
                        <button className='btn-close' data-bs-dismiss='modal' />
                    </div>

                    <div className='modal-body'>
                        <form>
                            <div className='mb-3'>
                                <label className='col-form-label'>Nome:</label>
                                <input type='text' className='form-control' />
                            </div>

                            <div className='mb-3'>
                                <label className='col-form-label'>Mensagem:</label>
                                <textarea className='form-control' />
                            </div>
                        </form>
                    </div>

                    <div className='modal-footer'>
                        <button
                            type='button'
                            className='btn btn-primary'
                            onClick={() => {
                                console.log("Mensagem enviada!");
                                const modal = bootstrap.Modal.getInstance(
                                    document.getElementById("exampleModal")
                                );
                                modal.hide();
                            }}
                        >
                            Enviar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
