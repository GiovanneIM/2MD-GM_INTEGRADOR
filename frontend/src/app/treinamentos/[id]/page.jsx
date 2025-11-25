"use client";
/*
    Página onde os usuáriso acessam uma lista que contém os treinamentos em que o usuários está inserido ou criou onde temos algumas informações e é onde o 
    usuario pode deletar algum treinamento 
    Nesta página ele pode escolher o treinamento e ele será redirecionados para uma página onde ele pode mudar o nome descrição 
    e Status do treinamento 
*/

import './treinamentos.css'

export default function Treinamentos() {

    const Status = {
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };

    return (<>

        <div className="titulo">
            <h1>Treinamentos</h1>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <div className="main-box clearfix">
                        <div className="table-responsive">
                            <table className="table user-list">
                                <thead>
                                    <tr>
                                        <th>
                                            <span>User</span>
                                        </th>
                                        <th>
                                            <span>Created</span>
                                        </th>
                                        <th className="text-center">
                                            <span>Status</span>
                                        </th>
                                        <th>
                                            <span>Email</span>
                                        </th>
                                        <th>&nbsp;</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Mila Kunis
                                            </a>
                                            <span className="user-subhead">Admin</span>
                                        </td>
                                        <td>2013/08/08</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">mila@kunis.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="  fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar2.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                George Clooney
                                            </a>
                                            <span className="user-subhead">Member</span>
                                        </td>
                                        <td>2013/08/12</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">marlon@brando.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar3.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Ryan Gossling
                                            </a>
                                            <span className="user-subhead">Registered</span>
                                        </td>
                                        <td>2013/03/03</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">jack@nicholson</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar4.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Emma Watson
                                            </a>
                                            <span className="user-subhead">Registered</span>
                                        </td>
                                        <td>2004/01/24</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">humphrey@bogart.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar5.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Robert Downey Jr.
                                            </a>
                                            <span className="user-subhead">Admin</span>
                                        </td>
                                        <td>2013/12/31</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">spencer@tracy</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Mila Kunis
                                            </a>
                                            <span className="user-subhead">Admin</span>
                                        </td>
                                        <td>2013/08/08</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">mila@kunis.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar7.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                George Clooney
                                            </a>
                                            <span className="user-subhead">Member</span>
                                        </td>
                                        <td>2013/08/12</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">marlon@brando.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Ryan Gossling
                                            </a>
                                            <span className="user-subhead">Registered</span>
                                        </td>
                                        <td>2013/03/03</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">jack@nicholson</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar1.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Emma Watson
                                            </a>
                                            <span className="user-subhead">Registered</span>
                                        </td>
                                        <td>2004/01/24</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">humphrey@bogart.com</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <img
                                                src="https://bootdey.com/img/Content/avatar/avatar6.png"
                                                alt=""
                                            />
                                            <a href="#" className="user-link">
                                                Robert Downey Jr.
                                            </a>
                                            <span className="user-subhead">Admin</span>
                                        </td>
                                        <td>2013/12/31</td>
                                        <td className="text-center">
                                            <span className={`text-${Status.Concluido[0]} fa ${Status.Concluido[1]} col-2`}></span>
                                        </td>
                                        <td>
                                            <a href="#">spencer@tracy</a>
                                        </td>
                                        <td style={{ width: "20%" }}>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-search-plus fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-pencil fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                            <a href="#" className="table-link danger">
                                                <span className="fa-stack">
                                                    <i className="fa fa-square fa-stack-2x" />
                                                    <i className="fa fa-trash-o fa-stack-1x fa-inverse" />
                                                </span>
                                            </a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <ul className="pagination pull-right">
                            <li>
                                <a href="#">
                                    <i className="fa fa-chevron-left" />
                                </a>
                            </li>
                            <li>
                                <a href="#">1</a>
                            </li>
                            <li>
                                <a href="#">2</a>
                            </li>
                            <li>
                                <a href="#">3</a>
                            </li>
                            <li>
                                <a href="#">4</a>
                            </li>
                            <li>
                                <a href="#">5</a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-chevron-right" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </>)
}