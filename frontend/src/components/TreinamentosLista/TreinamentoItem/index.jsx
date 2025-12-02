'use client'

import { useEffect, useState } from 'react';

export default function TreinamentosItem({ tr, tipoUsuario }) {
    const [tempo, setTempo] = useState('');

    const Status = {
        'Pendente': ['primary', 'fa-question-circle'],
        'Em andamento': ['warning', 'fa-cogs'],
        'Concluido': ['success', 'fa-check'],
        'Cancelado': ['danger', 'fa-xmark'],
    };

    useEffect(() => {
        const atualizarTempo = () => tempoDecorrido(tr.data_criacao);
        atualizarTempo(); // chama ao montar

        const interval = setInterval(atualizarTempo, 60000); // atualiza a cada minuto

        return () => clearInterval(interval);
    }, [tr.data_criacao]);

    /* Função para calcular o tempo decorrido desde a data de criação do treinamento */
    function tempoDecorrido(data_criacao) {
        const diferenca = Date.now() - new Date(data_criacao).getTime();

        const segundos = Math.floor(diferenca / 1000);
        const minutos = Math.floor(segundos / 60);
        const horas = Math.floor(minutos / 60);
        const dias = Math.floor(horas / 24);
        const meses = Math.floor(dias / 30);
        const anos = Math.floor(meses / 12);

        if (segundos < 60) {
            setTempo(`Há alguns segundos`);
        } else if (minutos < 60) {
            setTempo(`Há ${minutos} ${minutos !== 1 ? 'minutos' : 'minuto'}`);
        } else if (horas < 24) {
            setTempo(`Há ${horas} ${horas !== 1 ? 'horas' : 'hora'}`);
        } else if (dias < 365) {
            setTempo(`Há ${dias} ${dias !== 1 ? 'dias' : 'dia'}`);
        } else if (meses < 12) {
            setTempo(`Há ${meses} ${meses !== 1 ? 'meses' : 'mês'}`);
        } else {
            setTempo(`Há ${anos} ${anos !== 1 ? 'anos' : 'ano'}`);
        }
    };

    return (
        <div key={tr.id} className='d-flex align-items-center border-bottom mb-2 pb-2'>
            <div
                className={`flex-shrink-0 bg-${Status[tr.estado][0]} bg-opacity-10 rounded d-flex justify-content-center align-items-center`}
                style={{ width: '2.5rem', height: '2.5rem' }}
            >
                <i className={`fas ${Status[tr.estado][1]} text-${Status[tr.estado][0]}`} />
            </div>

            <div className='flex-grow-1 ms-3 d-flex justify-content-between'>
                <div>
                    <h6 className='mb-1'>{tr.nome}</h6>
                    <p className='text-muted small mb-0'>{tempo}</p>
                </div>

                <div>
                    <a className='btn btn-White' href={`/${tipoUsuario}/treinamento/${tr.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8" />
                        </svg>
                    </a>
                </div>
            </div >
        </div >
    );
}
