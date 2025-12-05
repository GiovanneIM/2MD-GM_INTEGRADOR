export default function AcoesRapidas({ idEquipe }) {

    return (<>
        <div className='card border-0 shadow-sm p-3 col-12 h-100 pb-2'>
            {/* Titulo */}
            <div className='card-header bg-white border-0 px-0'>
                <div className='d-flex justify-content-between align-items-center'>
                    <h5 className='mb-0 fs-5'>Ações rápidas</h5>
                </div>
            </div>

            {/* Botões */}
            <div className='card-body'>
                <div className='d-grid gap-2'>
                    {/* Botão para ver treinamentos */}
                    <a className='btn btn-White border text-start d-flex align-items-center' href='/treinamentos'>
                        <i className='fas fa-book me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver treinamentos
                    </a>

                    {/* Botão para ver equipe */}
                    <a className='btn btn-White border text-start d-flex align-items-center' href={`/equipes/${idEquipe}`}>
                        <i className='fas fa-users me-2 text-primary text-center' style={{ width: '1.5rem' }} /> Ver minha equipe
                    </a>
                </div>
            </div>
        </div>
    </>);
}