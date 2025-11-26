'use client';
/*
    Página onde os usuáriso acessam uma lista que contém os treinamentos em que o usuários está inserido ou criou onde temos algumas informações e é onde o 
    usuario pode deletar algum treinamento 
    Nesta página ele pode escolher o treinamento e ele será redirecionados para uma página onde ele pode mudar o nome descrição 
    e Status do treinamento 
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
        <div className='container py-4'>
            {/* Titulo da página*/}
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Treinamentos</h1></div>
            </div>

            {/* Corpo da página */}
            <div className='row'>
                <div className='col-lg-12'>
                    <div className='main-box clearfix'>
                        <div className='table-responsive'>
                            <table className='table user-list'>
                                <thead>
                                    <tr>
                                        <th>
                                            <span>Nome</span>
                                        </th>
                                        <th>
                                            <span>Criado</span>
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
                                        <td>2013/08/08</td>
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
                                        <td>2013/08/12</td>
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
                                        <td>2013/03/03</td>
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
                                        <td>2004/01/24</td>
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
                                        <td>2013/12/31</td>
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
                                        <td>2013/08/08</td>
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
                                        <td>2013/08/12</td>
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
                                        <td>2013/03/03</td>
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
                                        <td>2004/01/24</td>
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
                                        <td>2013/12/31</td>
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
        </div>


    </>)
}