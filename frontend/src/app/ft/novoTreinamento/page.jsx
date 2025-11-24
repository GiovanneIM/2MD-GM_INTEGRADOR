'use client'

/*
    Página para que o FT realize o cadastro de um novo treinamento
        • Coletar as informações do treinamento (Nome, descrição e participantes)
*/

import { useEffect, useState } from "react"

import Swal from "sweetalert2";

import './novoTreinamento.css';

export default function NovoTreinamento() {
    const [usuario, setUsuario] = useState([]);
    const [mts, setMTs] = useState([]);

    const [nomeTreinamento, setNomeTreinamento] = useState('');
    const [descricaoTreinamento, setDescricaoTreinamento] = useState('');
    const [participantes, setParticipantes] = useState([]);

    const [erro, setErro] = useState(null);

    // = = = = = = = = = = = = = = = = = = =
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

    /* Função para carregar os MTs da área */
    useEffect(() => {
        async function carregarMTs() {
            const ft = JSON.parse(sessionStorage.getItem('usuario'))
            console.log(ft.id_equipe);


            try {
                const res = await fetch(`http://localhost:3000/api/equipes/${ft.id_equipe}/mt`);
                const data = await res.json();

                if (data.sucesso) {
                    console.log(data);

                    setMTs(data.dados);
                }
                else {
                    console.log(data.mensagem);
                }
            } catch (err) {
                console.error("Erro ao carregar membros:", err);
            }
        }

        carregarMTs()
    }, [])

    /* Função para adicionar ou remover participante */
    function adicionarParticipante(id) {
        setParticipantes(prev =>
            prev.includes(id)   // Verificando se o participante já está na lista
                ? prev.filter(x => x !== id)  // Retirando o participante
                : [...prev, id] // Adicionando o participante
        );
    }

    /* Função para adicionar ou remover todos os MTs */
    function SelecionarTodos(id) {
        if (participantes.length === mts.length) {
            // Removendo todos os MTs
            setParticipantes([]);
        } else {
            // Selecionando todos os MTs
            setParticipantes(mts.map(mt => mt.id));
        }
    }

    /* Função para cadastrar o treinamento */
    function CadastrarTreinamento(e) {
        e.preventDefault();

        setErro(null)

        const treinamento = {
            nome: nomeTreinamento,
            descricao: descricaoTreinamento,
            participantes: participantes,
            idCriador: usuario.id
        }

        fetch('http://127.0.0.1:3000/api/treinamentos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(treinamento)
        }).then(res => {
            return res.json();
        }).then(data => {
            if (data.sucesso) {
                // Alerta de usuário cadastrado
                Swal.fire({
                    title: "Treinamento cadastrado",
                    html: `
                            <p class="mb-2">Treinamento criado com sucesso</p>
                            <div class="text-start p-3 border rounded" style="background:#f8f9fa;">
                                <table class="table table-sm mb-0">
                                    <tbody>
                                        <div>
                                            <div class="fw-bold">Nome</div>
                                            <div>${data.dados.nome}</div>
                                        </div>
                                        <div>
                                            <div class="fw-bold mt-3">Descrição</div>
                                            <div>${data.dados.descricao}</div>
                                        </div>
                                    </tbody>
                                </table>
                            </div>
                        `,
                    icon: "success",
                    confirmButtonText: "Fechar",
                    confirmButtonColor: "#0956FF"
                });
            }
            else {
                setErro(data.mensagem)
            }
        }).catch(err => {
            console.log(err);
            setErro('Erro ao realizar o cadastro do treinamento, tente novamente mais tarde.')
        })
    }


    return <>
        <div className="container vh-100 d-flex justify-items-center align-items-center">
            <div className="col-12 bg-white shadow rounded p-3">
                <h3 className="card-title text-center mb-4">Novo treinamento</h3>

                {/* Formulário */}
                <form className="col-12 d-flex flex-wrap" onSubmit={CadastrarTreinamento}>
                    {/* Nome e descrição */}
                    <div className="col-12 col-lg-6 pe-lg-2 d-flex flex-column justify-content-lg-between">
                        {/* Nome */}
                        <div>
                            <label htmlFor="nomeTreinamento" className="form-label border-bottom border-primary-subtle col-12 fs-5">
                                Nome do treinamento
                            </label>
                            <input type="text" className="form-control" id="nomeTreinamento" placeholder="Digite o nome do treinamento" value={nomeTreinamento} onChange={(e) => setNomeTreinamento(e.target.value)} required />
                        </div>

                        {/* Descrição */}
                        <div className="mt-3 d-flex flex-column">
                            <label htmlFor="descricao" className="form-label border-bottom border-primary-subtle col-12 fs-5">
                                Descrição do treinamento
                            </label>
                            <textarea
                                className="form-control flex-grow-1" id="descricao" style={{ minHeight: '250px', maxHeight: '250px' }}
                                value={descricaoTreinamento} onChange={(e) => setDescricaoTreinamento(e.target.value)}
                                placeholder="Dê uma descrição ao treinamento..." required
                            />
                        </div>
                    </div>

                    {/* Participantes */}
                    <div className="col-12 col-lg-6 ps-lg-2 h-100 mt-3 mt-lg-0">
                        <div htmlFor="telefone" className="form-label d-flex flex-wrap justify-content-between border-bottom border-primary-subtle col-12 fs-5">
                            Treinamento destinado a

                            <div className="d-flex fs-6 align-items-center justify-content-center gap-1">
                                <input className="form-check-input m-0 p-0" type="checkbox" id='adicionarTodos'
                                    checked={participantes.length === mts.length}
                                    onChange={SelecionarTodos}
                                />
                                <label className="form-check-label col-12 overflow-hidden" htmlFor='adicionarTodos'>
                                    Selecionar todos os MTs
                                </label>
                            </div>
                        </div>

                        {/* Listando os MTs */}
                        <div className="col-12 border p-3 rounded overflow-y-scroll" style={{ height: '350px' }}>
                            {
                                mts.map((mt) => {
                                    return <div
                                        className={`selectParticipante form-check bordas bordaCinza py-2 ${participantes.includes(mt.id) ? "participanteSelecionado" : ""}`}
                                        key={mt.id}
                                    >
                                        <input className="form-check-input d-none m-0 p-0" type="checkbox" id={mt.id}
                                            checked={participantes.includes(mt.id)}
                                            onChange={() => adicionarParticipante(mt.id)}
                                        />

                                        <label className="form-check-label col-12 overflow-hidden" htmlFor={mt.id}>
                                            <div className="d-flex">
                                                <div>
                                                    <img
                                                        style={{ height: '4rem', width: '4rem' }}
                                                        src={mt.imagem ?? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'}
                                                    />
                                                </div>

                                                <div className="ms-2">
                                                    <div className="fw-bold">{mt.nome}</div>
                                                    <div className="text-muted">{mt.email}</div>                                                    </div>
                                            </div>
                                        </label>
                                    </div >
                                })
                            }
                        </div>
                    </div>

                    {/* Botão */}
                    <div className="col-12 text-center mt-3">
                        <button type="submit" className="btn btn-azulGM">
                            Novo treinamento
                        </button>
                    </div>
                </form>

                {/* Erro */}
                <div className='text-danger medium'>{erro}</div>
            </div >
        </div >
    </>
}