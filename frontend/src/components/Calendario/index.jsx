'use client';

import { useState, useEffect } from 'react';
import {
    Calendar,
    momentLocalizer,
    Views,
} from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

/* Eventos iniciais */
const initialEvents = [
    {
        id: 1,
        title: 'Reunião de Projeto',
        start: new Date(2025, 10, 12, 14, 0),
        end: new Date(2025, 10, 12, 15, 0),
    },
    {
        id: 2,
        title: 'Treinamento Interno',
        start: new Date(2025, 10, 15, 9, 0),
        end: new Date(2025, 10, 15, 11, 0),
    },
];

export default function Calendario({eventos}) {
    const [events, setEvents] = useState(initialEvents);
export default function Calendario() {
    const [events, setEvents] = useState([]);

    /* Carregar eventos do localStorage ao iniciar */
    useEffect(() => {
        const stored = localStorage.getItem('calendar-events');

        if (stored) {
            const parsed = JSON.parse(stored).map((ev) => ({
                ...ev,
                start: new Date(ev.start),
                end: new Date(ev.end),
            }));
            setEvents(parsed);
        } else {
            setEvents(initialEvents);
        }
    }, []);

    /* Salvar eventos no localStorage sempre que mudarem */
    useEffect(() => {
        if (events.length > 0) {
            localStorage.setItem('calendar-events', JSON.stringify(events));
        }
    }, [events]);


    return (
        <div className='flex-grow-1'>
            <Calendar
                localizer={localizer}
                events={eventos ?? events}
                startAccessor='start'
                endAccessor='end'
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                style={{ height: 600 }}
                popup
                selectable
                onSelectSlot={(slot) => {
                    const title = prompt('Nome do evento:');
                    if (title) {
                        const newEvent = {
                            id: events.length + 1,
                            title,
                            start: slot.start,
                            end: slot.end,
                        };

                        setEvents(prev => [...prev, newEvent]);
                    }
                }}
                onSelectEvent={(event) =>
                    alert(`Evento: ${event.title}`)
                }
            />
        </div>
    );
}
