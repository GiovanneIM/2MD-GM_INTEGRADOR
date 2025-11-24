'use client'

/*
    Página para que o admin realize o cadastro de um novo usuário
        • Verificar se há um admin logado (OK)
        • Coletar dados (Tipo, nome, email, senha e equipe) (OK)
        • Cadastrar o usuário no banco (OK)
*/

import { useState, useEffect } from "react"

import AcessoRestrito from "@/components/Sweetalert/AcessoRestrito";

import Swal from "sweetalert2";

export default function Cadastrar() {
    const [usuario, setUsuario] = useState([]);
    const [acesso, setAcesso] = useState(null);

    // Dados do novo usuário
    const [tipoUser, setTipoUser] = useState('mt');
    const [nomeUser, setNomeUser] = useState('');
    const [emailUser, setEmailUser] = useState('');
    const [senhaUser, setSenhaUser] = useState('');
    const [equipeUser, setEquipeUser] = useState('');

    const [erro, setErro] = useState(null)

    /* Carregando o usuário logado */
    useEffect(() => {
        try {
            async function carregarUsuario() {
                const res = await fetch('http://localhost:3000/api/auth/perfil', {
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token')
                    }
                });
                const data = await res.json();

                // Verificando se há um usuário logado
                if (data.sucesso) {
                    setUsuario(data.dados)

                    // Verificando se o usuário é um admin
                    if (data.dados.tipo === 'admin') {
                        setAcesso(true)
                    }
                    else {
                        setAcesso(false)
                    }
                }
                else {
                    setAcesso(false)
                }
            }

            carregarUsuario()
        }
        catch {
            setAcesso(false)
        }
    }, [])

    /* Carregando as equipes */
    const [equipes, setEquipes] = useState([]);
    useEffect(() => {
        async function carregarEquipes() {
            try {
                const res = await fetch('http://localhost:3000/api/equipes');
                const data = await res.json();

                if (data.sucesso) {
                    console.log(data.dados)
                    setEquipes(data.dados);
                } else {
                    console.log(data.mensagem);
                }
            } catch (err) {
                console.error("Erro ao carregar equipes:", err);
            }
        }

        carregarEquipes();
    }, []);

    /* Função para cadastrar o usuário no banco */
    function Cadastrar(e) {
        e.preventDefault();

        setErro(null)

        const novoUsuario = {
            nome: nomeUser,
            tipo: tipoUser,
            email: emailUser,
            senha: senhaUser,
            id_equipe: equipeUser
        };

        fetch('http://localhost:3000/api/usuarios', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + sessionStorage.getItem('token')
            },
            body: JSON.stringify(novoUsuario)
        }).then(res => {
            return res.json()
        }).then(data => {
            if (data.sucesso) {
                // Alerta de usuário cadastrado
                Swal.fire({
                    title: "Usuário cadastrado",
                    html: `
                        <p class="mb-2">O usuário foi cadastrado com as seguintes informações:</p>
                        <div class="text-start p-3 border rounded" style="background:#f8f9fa;">
                            <table class="table table-sm mb-0">
                                <tbody>
                                    <tr>
                                        <th class="fw-bold">Nome</th>
                                        <td>${data.dados.nome}</td>
                                    </tr>
                                    <tr>
                                        <th class="fw-bold">Email</th>
                                        <td>${data.dados.email}</td>
                                    </tr>
                                    <tr>
                                        <th class="fw-bold">Equipe</th>
                                        <td>${equipes.find(eq => eq.id == data.dados.id_equipe)?.nome}</td>
                                    </tr>
                                    <tr>
                                        <th class="fw-bold">Cargo</th>
                                        <td>${data.dados.tipo === 'mt' ? 'Membro de time' : 'Facilitador de time'}</td>
                                    </tr>
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
        }).catch(err =>
            setErro('Erro ao solicitar login, tente novamente mais tarde.')
        )
    }


    //  = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    // EXIBIÇÃO DA PÁGINA = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    // Se o acesso foi negado
    if (acesso === false) return (
        <>
            <div className="vh-100"></div>

            {/* Exibindo alerta dizendo que o acesso foi negado */}
            <AcessoRestrito text={`
                    Essa página é <b>restrita a administradores</b>.<br>
                    Você será redirecionado em alguns segundos
                `} />

            {/* Redirecionando o usuário */}
            {
                setTimeout(() => {
                    usuario.tipo
                        ? window.location.href = `/${usuario.tipo}/dashboard`
                        : window.location.href = '/login'
                }, 3500)
            }
        </>
    )

    // Se o acesso foi permitido
    if (acesso === true) return <>
        <div className="container py-4">
            {/* Título da página */}
            <div className="d-flex flex-column justify-content-between mb-3">
                <div className="bottom-bordaAzulGM ps-3 col-12"><h1 className="h3 mb-0 fw-bold fs-2">Cadastrar usuário</h1></div>
            </div>

            {/* Corpo da página */}
            <div className="col-12 d-flex flex-column flex-md-row bg-white shadow-sm d-flex my-4 p-3 rounded">
                {/* Icone de usuario */}
                <div className="col-md-6 pe-md-2 d-flex justify-content-center align-items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="75%" height="auto" fill="#0956FF" className="bi bi-person-circle" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                    </svg>
                </div>

                {/* Formulário */}
                <form className="col-md-6 ps-md-2 pt-3 pt-md-0 d-flex flex-column" onSubmit={Cadastrar}>
                    {/* Tipo de usuário */}
                    <div className="col-12 mb-3">
                        <label htmlFor="tipoUsuario" className="form-label">Tipo de usuário</label>
                        <select className="form-select bordaCinza" id="tipoUsuario" onChange={(e) => setTipoUser(e.target.value)} required>
                            <option value='mt'>MT - Membro de time</option>
                            <option value='ft'>FT - Facilitador de time</option>
                        </select>
                    </div>

                    {/* Nome de usuário */}
                    <div className="col-12 mb-3">
                        <label htmlFor="nome" className="form-label">Nome completo</label>
                        <input type="text" className="form-control bordaCinza" id="nome" onChange={(e) => setNomeUser(e.target.value)} value={nomeUser} placeholder="Nome completo" required />
                    </div>

                    {/* Email */}
                    <div className="col-12 mb-3">
                        <label htmlFor="email" className="form-label">E-mail</label>
                        <input type="text" className="form-control bordaCinza" id="email" onChange={(e) => setEmailUser(e.target.value)} value={emailUser} placeholder="E-mail" required />
                    </div>

                    {/* Senha */}
                    <div className="col-12 mb-3">
                        <label htmlFor="senha" className="form-label">Senha</label>
                        <input type="text" className="form-control bordaCinza" id="senha" onChange={(e) => setSenhaUser(e.target.value)} value={senhaUser} placeholder="Senha" required />
                    </div>

                    {/* Equipe */}
                    <div className="col-12 mb-3">
                        <label htmlFor="tipoUsuario" className="form-label">Equipe</label>
                        <select className="form-select bordaCinza" id="tipoUsuario" onChange={(e) => setEquipeUser(e.target.value)} required>
                            {equipes.map((eq) => <option key={eq.id} value={eq.id}>{eq.nome}</option>)}
                        </select>
                    </div>

                    {/* Botão para cadastrar */}
                    <div className="text-end mt-auto">
                        <button className="btn btn-azulGM">Cadastrar usuário</button>
                    </div>

                    {/* Erro */}
                    <div className='text-danger medium'>{erro}</div>
                </form>
            </div>
        </div>
    </>
}