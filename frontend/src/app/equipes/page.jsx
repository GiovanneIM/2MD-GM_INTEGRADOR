"use client";

/*
    Página para listar as equipes
        • Listar as equipes (OK)
        • Ao selecionar uma equipe, direcionar para a página dos membros da equipe (OK)
*/
 
import "./equipes.css";

import { useState, useEffect } from "react";

import LogoGM from "@/components/LogoGM";

export default function Equipes() {
    const [equipes, setEquipes] = useState([]);

    /* Carregando as equipes */
    useEffect(() => {
        async function carregarEquipes() {
            try {
                const res = await fetch('http://localhost:3000/api/equipes');
                const data = await res.json();

                if (data.sucesso) {
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

    return (
        <div className="equipes-wrapper">

            {/* Título da pagina e logo*/}
            <div className="logo">
                <h1 className="titulo-pagina">Equipes</h1>

                {/* Logo gm */}
                <LogoGM tamanho={55} cor={'#0956FF'} />
            </div>

            {/* Subtitulo */}
            <p className="subtitulo">Escolha uma equipe e veja seus times</p>

            {/* Listando as equipes */}
            <div className="equipes-container">
                {equipes.length === 0 ? (
                    <p className="text-muted mt-2">Carregando equipes...</p>
                ) : (
                    equipes.map((eq, index) => (
                        <div
                            key={eq.id}
                            className="card profile-card shadow"
                            onClick={() => window.location.href = `/equipes/${eq.id}`}
                            style={{ "--i": index }}
                        >
                            <div className="card-body">
                                <div className="iconeFerramentaria">
                                    <i className={eq.icone}></i>
                                </div>
                                <h3 className="card-title">{eq.nome}</h3>
                                <p className="card-text">{eq.descricao}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
