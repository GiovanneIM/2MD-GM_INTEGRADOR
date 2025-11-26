import Calendario from "@/components/Calendario";

export default function CalendarioPage() {
    return (<>
        <div className='container py-4'>
            {/* Titulo da página*/}
            <div className='d-flex flex-column justify-content-between mb-3'>
                <div className='bottom-bordaAzulGM ps-3 col-12'><h1 className='h3 mb-0 fw-bold fs-2'>Calendário</h1></div>
            </div>

            <div className='container py-4'>
                <div className='col-12 h-100 bg-white shadow p-3 rounded d-flex flex-column'>
                    <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                        <h5 className='mb-0 fs-5'>Próximas sessões</h5>
                    </div>

                    <Calendario />
                </div>
            </div>
        </div>


    </>);
}