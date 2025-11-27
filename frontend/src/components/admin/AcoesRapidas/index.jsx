export default function AcoesRapidas() {
    return <>
<<<<<<< HEAD
        <div className='card border-0 shadow-sm p-3 col-12 h-100 pb-2'>
            {/* Titulo */}
            <div className='card-header bg-white border-0 px-0'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='mb-0 fs-5'>Ações rápidas</h5>
=======
        <div className='col-12 col-lg-4'>
            <div className='card border-0 shadow-sm p-3'>
                {/* Titulo */}
                <div className='card-header bg-white border-0 px-0'>
                    <div className='d-flex justify-content-between align-items-center'>
                        <h5 className='mb-0 fs-5'>Ações rápidas</h5>
                    </div>
                </div>

                {/* Botões */}
                <div className='card-body'>
                    <div className='d-grid gap-2'>
                        <a className='btn btn-White border text-start d-flex align-items-center' href='/ft/novoTreinamento'>
                            <i className='fas fa-plus me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Novo treinamento
                        </a>
                        <button className='btn btn-White border text-start d-flex align-items-center' onClick={() => window.location.href = '/admin/cadastrar'}>
                            <i className='fas fa-user-plus me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Registrar usuário
                        </button>
                        <a className='btn btn-White border text-start d-flex align-items-center' href='/treinamentos'>
                            <i className='fas fa-book me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver treinamentos
                        </a>
                        <a className='btn btn-White border text-start d-flex align-items-center' href='/equipes'>
                            <i className='fas fa-users me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver equipes
                        </a>
                    </div>
>>>>>>> cec524f0b71381e4d71f01ac7fe07f03c6957060
                </div>
            </div>

            {/* Botões */}
            <div className='card-body'>
                <div className='d-grid gap-2'>
                    <button className='btn btn-White border text-start d-flex align-items-center' onClick={() => { }}>
                        <i className='fas fa-plus me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Novo treinamento
                    </button>
                    <button className='btn btn-White border text-start d-flex align-items-center' onClick={() => window.location.href = '/admin/cadastrar'}>
                        <i className='fas fa-user-plus me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Registrar usuário
                    </button>
                    <button className='btn btn-White border text-start d-flex align-items-center'>
                        <i className='fas fa-file-alt me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Gerar Relatório
                    </button>
                    <button className='btn btn-White border text-start d-flex align-items-center'>
                        <i className='fas fa-cog me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Configurações
                    </button>
                </div>
            </div>
        </div>s
    </>
}