import EstadoTreinamento from "@/components/EstadoTreinamento/page";

export default function treinamentos() {
    return (<>
        <div className="container py-4">
            {/* Titulo da página*/}
            <div className="d-flex flex-column justify-content-between mb-3">
                <div className="bottom-bordaAzulGM ps-3 col-12"><h1 className="h3 mb-0 fw-bold fs-2">Seus treinamentos</h1></div>
            </div>

            <div className="col-12 d-flex flex-wrap row-gap-3">
                <div className="col-12 col-lg-6 pe-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Sessao'}/>
                            <h5 className="mb-0 fs-5">Próximas sessões</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome treinamento</div>
                                <div>00/00/0000 - 00:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-6 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Em andamento'}/>
                            <h5 className="mb-0 fs-5">Treinamentos em andamento</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome do treinamento</div>
                                <div>Nome do tutor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="col-12 d-flex flex-wrap row-gap-3 mt-3">
                <div className="col-12 col-lg-4 pe-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Pendente'}/>
                            <h5 className="mb-0 fs-5">Treinamentos pendentes</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome treinamento</div>
                                <div>00/00/0000 - 00:00</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Concluido'}/>
                            <h5 className="mb-0 fs-5">Treinamentos passados</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome do treinamento</div>
                                <div>Nome do tutor</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-lg-4 ps-lg-2">
                    <div className="col-12 bg-white shadow p-3 rounded">
                        <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                            <EstadoTreinamento estado={'Cancelado'}/>
                            <h5 className="mb-0 fs-5">Treinamentos cancelados</h5>
                        </div>

                        <div className="col-12 border rounded p-3 overflow-y-scroll" style={{ height: '350px' }}>
                            <div className="border rounded p-3">
                                <div>Nome do treinamento</div>
                                <div>Nome do tutor</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);
}

{/* 
    <div className="col-12 d-flex bg-white shadow p-3 rounded">
        <div className="col-12 pe-md-2">
            <div className='col-12 col-md-6'>
                <h5 className="mb-0 fs-5">Certificados</h5>
            </div>
            <div className="col-12 border rounded p-3 overflow-x-scroll">
                <div className="border rounded p-3" style={{width: '300px', height:'300px'}}>
                    <div>Nome do treinamento</div>
                    <div>Finalizado em: 00/00/0000</div>
                    <div>Tutor: Nome do tutor</div>
                    <div>Emitido em: 00/00/0000</div>
                </div>
            </div>
        </div>
    </div>
*/}