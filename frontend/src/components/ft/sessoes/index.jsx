
import { useState } from "react";

import Calendario from '@/components/Calendario';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

const MySwal = withReactContent(Swal);

export default function Sessoes({
    sessoes = [],
    registrarSessao
}) {
    for (const i in sessoes) {
        sessoes[i].indice = parseInt(i) + 1;
    }

    function novaSessao() {
        let dia = null;
        let horaInicio = null;
        let horaFim = null;
        let localidade = "";

        MySwal.fire({
            title: "Nova sessão",
            showConfirmButton: false,
            html: (
                <div className='text-start p-3 border rounded' style={{ background: "#f8f9fa" }}>
                    <div className="d-flex flex-wrap">

                        <div className="col-12 mb-3">
                            <label className="col-12 fw-bold">Dia</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Escolha o dia"
                                    format="DD/MM/YYYY"
                                    minDate={dayjs().add(1, "day")}
                                    onChange={(value) => {
                                        dia = value;
                                    }}
                                    className='col-12 bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="col-12 col-md-6 pe-md-2 mb-3">
                            <label className="fw-bold">Início às</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Horário de início"
                                    onChange={(value) => {
                                        horaInicio = value;
                                    }}
                                    className='bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="col-12 col-md-6 ps-md-2 mb-3">
                            <label className="fw-bold">Término às</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label="Horário de término"
                                    onChange={(value) => {
                                        horaFim = value;
                                    }}
                                    className='bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className="col-12">
                            <label htmlFor="localidade" className="fw-bold">Local</label>
                            <input
                                id='localidade'
                                className="form-control"
                                placeholder="Local da sessão"
                                onChange={(e) => (localidade = e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="mt-3 text-center">
                        <button id="btnFecharSwal" className="swal2-confirm swal2-styled border btn-White">Fechar</button>
                        <button id="btnMarcarSessao" className="swal2-cancel swal2-styled btn-azulGM">Marcar sessão</button>
                    </div>
                </div>
            ),
            didOpen: () => {
                document.getElementById("btnFecharSwal").addEventListener("click", () => {
                    Swal.close();
                });

                document.getElementById("btnMarcarSessao").addEventListener("click", () => {
                    registrarSessao({
                        dia: dia ? dia.format("YYYY-MM-DD") : null,
                        hora_inicio: horaInicio ? horaInicio.format("HH:mm:ss") : null,
                        hora_fim: horaFim ? horaFim.format("HH:mm:ss") : null,
                        localidade: localidade,
                    });

                    Swal.close();
                });
            }
        });
    }

    return (<>
        <div className="col-12 col-lg-6 pb-3 pb-lg-0 pe-md-2 d-flex flex-column gap-3 ">
            {/* Div superior */}
            <div className='col-12 d-flex justify-content-between border-bottom pb-3 px-3'>
                <div className='mb-0 fs-4'>Sessões</div>

                {/* Botão para adicionar sessão */}
                <button className='btn btn-secondary btn-sm' onClick={novaSessao}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
                    </svg>
                    Nova sessão
                </button>
            </div>

            {/* Lista de sessões */}
            <div className='flex-grow-1 border p-3 d-flex flex-column gap-3 overflow-y-scroll'>

                {sessoes && sessoes.map((s) =>
                    <div className='border p-3' key={s.indice}>
                        <div>
                            <div>Sessão {s.indice}</div>
                            <div>Data: {s.dia}</div>
                            <div>Horário: Das {s.hora_inicio} às {s.hora_fim}</div>
                            <div>Local: {s.localidade}</div>
                        </div>
                    </div>
                )}

            </div>
        </div>

        <div className="col-12 col-lg-6 pb-3 pb-lg-0 ps-md-2 d-flex flex-column gap-3">
            <Calendario eventos={sessoes} />
        </div>
    </>)
}