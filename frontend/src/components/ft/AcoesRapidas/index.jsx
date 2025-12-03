'use client'

import { useState, useEffect, use } from 'react';

export default function AcoesRapidas() {
    const [usuario, setUsuario] = useState([]);

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

    return <>
        <div className='card border-0 shadow-sm p-3 col-12 h-100 pb-2'>
            {/* Titulo */}
            <div className='card-header bg-white border-0 px-0'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h2 className='mb-0 fs-5'>Ações rápidas</h2>
                </div>
            </div>

            {/* Botões */}
            <div className='card-body'>
                <div className='d-grid gap-2'>
                    <a className='btn btn-White border text-start d-flex align-items-center' href='/ft/novoTreinamento'>
                        <i className='fas fa-plus me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Novo treinamento
                    </a>
                    <a className='btn btn-White border text-start d-flex align-items-center' href='/treinamentos'>
                        <i className='fas fa-book me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver treinamentos
                    </a>
                    <a className='btn btn-White border text-start d-flex align-items-center' href={`/equipes/${usuario?.id_equipe}`}>
                        <i className='fas fa-users me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver minha equipe
                    </a>
                </div>
            </div>
        </div>
    </>
}