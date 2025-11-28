'use client';

// import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

// Importando o calendário
import { Calendar, Views } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configurando o calendário para português
import { dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

const locales = { 'pt-BR': ptBR, }
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    getDay,
    locales,
})


/* Eventos testes */
const eventosTestes = [
    {
        id: 1,
        title: 'Reunião de Projeto - Sessão 1',

        inicio: new Date(2025, 10, 27, 14, 0),
        fim: new Date(2025, 10, 27, 18, 0),

        idSessao: 1,
        treinamento: 'Power Apps',
        orientador: 'João Paulo Machado',
        criacao: new Date(2025, 10, 10, 12, 0)
    }
];


export default function Calendario({ eventos }) {
    // const [events, setEvents] = useState(initialEvents);

    /* Carregar eventos do localStorage ao iniciar */
    // useEffect(() => {
    //     const stored = localStorage.getItem('calendar-events');

    //     if (stored) {
    //         const parsed = JSON.parse(stored).map((ev) => ({
    //             ...ev,
    //             start: new Date(ev.start),
    //             end: new Date(ev.end),
    //         }));
    //         setEvents(parsed);
    //     } else {
    //         setEvents(initialEvents);
    //     }
    // }, []);

    /* Salvar eventos no localStorage sempre que mudarem */
    // useEffect(() => {
    //     if (events.length > 0) {
    //         localStorage.setItem('calendar-events', JSON.stringify(events));
    //     }
    // }, [events]);

    /* Função para deixar a primeira letra de uma string */
    function capitalize(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    /* Função para formatar a exibição de data */
    function formatarData(data) {
        const diaDaSemana = capitalize(format(data, "EEEE", { locale: ptBR }));
        const diaEHora = format(data, "dd/MM/yyyy - HH:mm", { locale: ptBR });

        return `${diaDaSemana}<br/>${diaEHora}`;
    }

    /* Abrir SweetAlert com informações da sessão */
    function swalSessao(sessao) {
        Swal.fire({
            title: `${sessao.title}`,
            html: `
                <div class='text-start p-3 border rounded' style='background:#f8f9fa;'>
                    <table class='table table-sm mb-0'>
                        <tbody>
                            <div>
                                <div class='fw-bold'>Treinamento</div>
                                <div>${sessao?.treinamento ?? 'Nome do treinamento'}</div>
                            </div>

                            <div class='mt-3'>
                                <div class='fw-bold'>Orientador(a)</div>
                                <div>${sessao?.orientador ?? 'Nome criador do sessão'}</div>
                            </div>

                            <div class='mt-3'>
                                <div class='fw-bold'>Orientador(a)</div>
                                <div>${sessao?.orientador ?? 'Nome criador da sessão'}</div>
                            </div>
                        </tbody>
                    </table>
                </div>

                <div class='col-12 d-flex flex-wrap'>
                    <div class='col-12 col-sm-6 mt-3'>
                        <div class='fw-bold'>Sessão criada em</div>
                        <div>${sessao.criacao ? formatarData(sessao.criacao) : "Dia da semana <br/> 00/00/0000 - 00:00"}</div>
                    </div>

                    <div class='col-12 col-sm-6 mt-3'>
                        <div class='fw-bold'>Data da sessão</div>
                        <div>${sessao.inicio ? formatarData(sessao.inicio) : "Dia da semana <br/> 00/00/0000 - 00:00"}</div>
                    </div>
                </div>

                <div class='mt-3'>
                    <button id="btnFecharSwal" class="swal2-confirm swal2-styled border btn-White">Fechar</button>
                    <button id="btnIrSessao" class="swal2-cancel swal2-styled btn-azulGM">Ver sessão</button>
                </div>
            `,
            showConfirmButton: false,

            didOpen: () => {
                document.getElementById("btnFecharSwal").addEventListener("click", () => {
                    Swal.close();
                });

                document.getElementById("btnIrSessao").addEventListener("click", () => {
                    window.location.href = `/sessao/${sessao.idSessao}`
                });
            }
        })
    }

    return (
        <div className='flex-grow-1'>
            <Calendar
                localizer={localizer}
                culture="pt-BR"

                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                messages={{
                    month: "Mês",
                    week: "Semana",
                    day: "Dia",
                    today: "Atual",
                    previous: "Anterior",
                    next: "Próximo",
                    agenda: "Agenda"
                }}

                events={eventos ?? eventosTestes}

                startAccessor='inicio'
                endAccessor='fim'

                style={{ height: 600 }}
                popup
                selectable

                // onSelectSlot={(slot) => {
                //     const title = prompt('Nome do evento:');
                //     if (title) {
                //         const newEvent = {
                //             id: events.length + 1,
                //             title,
                //             start: slot.start,
                //             end: slot.end,
                //         };

                //         setEvents(prev => [...prev, newEvent]);
                //     }
                // }}

                onSelectEvent={(event) => swalSessao(event)}
            />
        </div>
    );
}

