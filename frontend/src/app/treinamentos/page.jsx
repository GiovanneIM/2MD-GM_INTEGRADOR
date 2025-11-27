'use client';

/*
    Página onde serão listados os treinamentos em que o usuários está inserido ou os quais ele criou
        • Listar os treinamentos do usuário e suas informações resumidas
        • Ao selecionar um treino, o usuário é direcionado à página de controle do treinamento
*/

import './treinamentos.css'

export default function Treinamentos() {

    const Status = {
        'Pendente': ['primary', 'fa-question-circle'],
        'Em andamento': ['warning', 'fa-cogs'],
        'Concluido': ['success', 'fa-check'],
        'Cancelado': ['danger', 'fa-xmark'],
    };

    return (<>
        <div className='container h-100 py-4 d-flex flex-column'>
            {/* Titulo da página*/}
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Treinamentos</h1></div>
            </div>

            {/* Corpo da página */}
            <div className='flex-grow-1 d-flex flex-column'>
                {/* Lista dos treinamentos */}
                <div className='bg-white shadow-sm p-3 rounded flex-grow-1 d-flex flex-column gap-3'>
                    {/* Título  e botões */}
                    <div className='card-header bg-white border-0 px-0 d-flex flex-wrap'>
                        <div className='col-12 col-md-6'>
                            <h5 className='mb-0 fs-5'>Treinamentos</h5>
                        </div>

                        {/* Botão para exibir os treinamentos realizados */}
                        <button
                            className={`col-12 col-sm-6 col-md-3 btn border rounded-0 btn-filtro`}
                        >
                            Realizados
                        </button>

                        {/* Botão para exibir os treinamentos ofertados */}
                        {
                            <button
                                className={`col-12 col-sm-6 col-md-3 btn border rounded-0 btn-filtro`}
                            >
                                Ofertados
                            </button>
                        }
                    </div>

                    <div className='col-12 border flex-grow-1 p-3 overflow-y-scroll'>
                        <table className='table user-list'>
                            <thead>
                                <tr>
                                    <th>
                                        <span>Nome</span>
                                    </th>
                                    <th>
                                        <span>Criado em</span>
                                    </th>
                                    <th className='text-center'>
                                        <span>Status</span>
                                    </th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>08/08/2013</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>08/12/2014</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status['Em andamento'][0]} fa ${Status['Em andamento'][1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>03/03/2015</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Cancelado[0]} fa ${Status.Cancelado[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>01/24/2016</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Pendente[0]} fa ${Status.Pendente[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>31/12/2017</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>08/08/2018</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Cancelado[0]} fa ${Status.Cancelado[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>08/12/2019</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Pendente[0]} fa ${Status.Pendente[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>03/03/2020</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status['Em andamento'][0]} fa ${Status['Em andamento'][1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>24/01/2021</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Cancelado[0]} fa ${Status.Cancelado[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <a href='#' className='user-link'>
                                            Treinamento
                                        </a>
                                    </td>
                                    <td>31/12/2022</td>
                                    <td className='text-center'>
                                        <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                    </td>
                                    <td style={{ width: '20%' }}>
                                        <a href='#' className='table-link'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' />
                                                <i className='fa fa-search-plus fa-stack-1x fa-inverse' />
                                            </span>
                                        </a>
                                        <a href='#' className='table-link danger'>
                                            <span className='fa-stack'>
                                                <i className='fa fa-square fa-stack-2x' style={{ color: 'red' }}></i>
                                                <i className='fa fa-trash fa-stack-1x' style={{ color: 'white' }}></i>
                                            </span>
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>


    </>)
}