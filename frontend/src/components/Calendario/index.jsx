"use client";

import { useState } from "react";
import {
    Calendar,
    momentLocalizer,
    Views,
} from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const initialEvents = [
    {
        id: 1,
        title: "Reunião de Projeto",
        start: new Date(2025, 10, 12, 14, 0),
        end: new Date(2025, 10, 12, 15, 0),
    },
    {
        id: 2,
        title: "Treinamento Interno",
        start: new Date(2025, 10, 15, 9, 0),
        end: new Date(2025, 10, 15, 11, 0),
    },
];

export default function Calendario() {
    const [events, setEvents] = useState(initialEvents);

    return (
        <div>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={[Views.MONTH, Views.WEEK, Views.DAY]}
                style={{ height: 600 }}
                popup
                selectable
                onSelectSlot={(slot) => {
                    const title = prompt("Nome do evento:");
                    if (title) {
                        setEvents([
                            ...events,
                            {
                                id: events.length + 1,
                                title,
                                start: slot.start,
                                end: slot.end,
                            },
                        ]);
                    }
                }}
                onSelectEvent={(event) =>
                    alert(`Evento: ${event.title}`)
                }
            />
        </div>
    );
}
