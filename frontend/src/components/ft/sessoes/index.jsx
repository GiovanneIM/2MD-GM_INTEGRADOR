import Calendario from '@/components/Calendario';

import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

const MySwal = withReactContent(Swal);

export default function Sessoes({
    treinamento,
    sessoes,
    criador,
    registrarSessao,
}) {
    const hoje = new Date();
    const diaHoje = hoje.getDate() < 10 ? ('0' + hoje.getDate()) : (hoje.getDate());
    // const dataAtual = diaHoje + '/' + (hoje.getMonth() + 1) + '/' + hoje.getFullYear();
    const dataAtual = '06/12/2025';

    for (const i in sessoes) {
        sessoes[i].indice = parseInt(i) + 1;
    }

    /* Função para criar uma nova sessão */
    function novaSessao() {
        let dia = null;
        let horaInicio = null;
        let horaFim = null;
        let localidade = '';

        MySwal.fire({
            scrollbarPadding: false,
            heightAuto: false,

            title: 'Nova sessão',
            showConfirmButton: false,
            html: (
                <div className='text-start p-3 border rounded' style={{ background: '#f8f9fa' }}>
                    <div className='d-flex flex-wrap'>

                        <div className='col-12 mb-3'>
                            <label className='col-12 fw-bold'>Dia</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label='Escolha o dia'
                                    format='DD/MM/YYYY'
                                    minDate={dayjs().add(1, 'day')}
                                    onChange={(value) => {
                                        dia = value;
                                    }}
                                    className='col-12 bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className='col-12 col-md-6 pe-md-2 mb-3'>
                            <label className='fw-bold'>Início às</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label='Horário de início'
                                    onChange={(value) => {
                                        horaInicio = value;
                                    }}
                                    className='bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className='col-12 col-md-6 ps-md-2 mb-3'>
                            <label className='fw-bold'>Término às</label>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <TimePicker
                                    label='Horário de término'
                                    onChange={(value) => {
                                        horaFim = value;
                                    }}
                                    className='bg-white'
                                />
                            </LocalizationProvider>
                        </div>

                        <div className='col-12'>
                            <label htmlFor='localidade' className='fw-bold'>Local</label>
                            <input
                                id='localidade'
                                className='form-control'
                                placeholder='Local da sessão'
                                onChange={(e) => (localidade = e.target.value)}
                            />
                        </div>
                    </div>

                    <div className='mt-3 text-center'>
                        <button id='btnFecharSwal' className='swal2-confirm swal2-styled border btn-White'>Fechar</button>
                        <button id='btnMarcarSessao' className='swal2-cancel swal2-styled btn-azulGM'>Marcar sessão</button>
                    </div>
                </div>
            ),
            didOpen: () => {
                document.getElementById('btnFecharSwal').addEventListener('click', () => {
                    Swal.close();
                });

                document.getElementById('btnMarcarSessao').addEventListener('click', () => {
                    registrarSessao({
                        dia: dia ? dia.format('YYYY-MM-DD') : null,
                        hora_inicio: horaInicio ? horaInicio.format('HH:mm:ss') : null,
                        hora_fim: horaFim ? horaFim.format('HH:mm:ss') : null,
                        localidade: localidade,
                    });

                    Swal.close();
                });
            }
        });
    }

    /* Função para Cancelar uma sessão */
    function cancelarSessao() {
        MySwal.fire({
            scrollbarPadding: false,
            heightAuto: false,

            title: 'Desmarcar sessão',
            showConfirmButton: false,
            html: (
                <div className='text-start p-3 border rounded' style={{ background: '#f8f9fa' }}>
                    <div className='d-flex flex-wrap'>
                        Deseja confirmar o cancelamento da sessão?
                    </div>

                    <div className='mt-3 text-center'>
                        <button id='btnFecharSwal' className='swal2-confirm swal2-styled border btn-White'>Cancelar</button>
                        <button id='btnDesmarcarSessao' className='swal2-cancel swal2-styled btn-azulGM'>Confirmar</button>
                    </div>
                </div>
            ),
            didOpen: () => {
                document.getElementById('btnFecharSwal').addEventListener('click', () => {
                    Swal.close();
                });

                document.getElementById('btnDesmarcarSessao').addEventListener('click', () => {
                    Swal.close();
                });
            }
        });
    }

    /* Função para Concluir uma sessão */
    function concluirSessao() {
        let dia = null;
        let horaInicio = null;
        let horaFim = null;
        let localidade = '';

        MySwal.fire({
            scrollbarPadding: false,
            heightAuto: false,

            title: 'Concluir sessão',
            showConfirmButton: false,
            html: (
                <div className='text-start p-3 border rounded' style={{ background: '#f8f9fa' }}>
                    <div className='d-flex flex-wrap'>

                    </div>

                    <div className='mt-3 text-center'>
                        <button id='btnFecharSwal' className='swal2-confirm swal2-styled border btn-White'>Cancelar</button>
                        <button id='btnConcluirSessao' className='swal2-cancel swal2-styled btn-azulGM'>Concluir</button>
                    </div>
                </div>
            ),
            didOpen: () => {
                document.getElementById('btnFecharSwal').addEventListener('click', () => {
                    Swal.close();
                });

                document.getElementById('btnConcluirSessao').addEventListener('click', () => {
                    registrarSessao({
                        dia: dia ? dia.format('YYYY-MM-DD') : null,
                        hora_inicio: horaInicio ? horaInicio.format('HH:mm:ss') : null,
                        hora_fim: horaFim ? horaFim.format('HH:mm:ss') : null,
                        localidade: localidade,
                    });

                    Swal.close();
                });
            }
        });
    }

    if (sessoes) return (<>
        <div className='col-12 col-lg-6 pb-3 pb-lg-0 pe-md-2 d-flex flex-column gap-3 ' style={{ height: 600 }}>
            {/* Div superior */}
            <div className='col-12 d-flex justify-content-between border-bottom pb-3 px-3'>
                <div className='mb-0 fs-4'>Sessões</div>

                {/* Botão para adicionar sessão */}
                {criador ?
                    <button className='btn btn-secondary btn-sm' onClick={novaSessao}>
                        <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-plus' viewBox='0 0 16 16'>
                            <path d='M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4' />
                        </svg>
                        Nova sessão
                    </button>
                    : <></>
                }
            </div>

            {/* Lista de sessões */}
            <div className='flex-grow-1 border p-3 d-flex flex-column gap-3 overflow-y-scroll'>

                {sessoes.map((s) =>
                    <div className='border p-3' key={s.indice}>
                        <div className='d-flex flex-wrap row-gap-2 mb-2'>
                            <div className='col-12 fw-bold'>Sessão {s.indice}</div>
                            <div className='col-12 col-sm-6'>Data: {s.dia}</div>
                            <div className='col-12 col-sm-6'>Horário: Das {s.hora_inicio} às {s.hora_fim}</div>
                            <div className='col-12 col-sm-6'>Local: {s.localidade}</div>
                            <div className='col-12 col-sm-6'>Estado: {s.estado}</div>
                        </div>

                        {criador ?
                            <div className='d-flex gap-3'>
                                <button className='btn btn-danger' onClick={cancelarSessao}>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='26' height='26' fill='currentColor' className='bi bi-x' viewBox='0 0 16 16'>
                                        <path d='M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708' />
                                    </svg>
                                    Desmarcar sessão
                                </button>

                                <button className='btn btn-success' disabled={dataAtual != s.dia} onClick={concluirSessao}>
                                    <svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' fill='currentColor' className='bi bi-check' viewBox='0 0 16 16'>
                                        <path d='M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425z' />
                                    </svg>
                                    Concluir sessão
                                </button>
                            </div>
                            : <></>
                        }
                    </div>
                )}

            </div>
        </div>

        <div className='col-12 col-lg-6 pb-3 pb-lg-0 ps-md-2 d-flex flex-column gap-3'>
            <Calendario sessoes={sessoes} treinamento={treinamento} cancelarSessao={cancelarSessao} concluirSessao={concluirSessao}/>
        </div>
    </>)
}