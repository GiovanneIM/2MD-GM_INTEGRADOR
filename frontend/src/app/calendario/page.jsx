export default function Calendario() {
    return (<>
        <div className='col-12'>
            <div className='col-12 h-100 bg-white shadow p-3 rounded'>
                <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                    <h5 className='mb-0 fs-5'>Próximas sessões</h5>
                </div>

                <Calendario />
            </div>
        </div>
    </>);
}