import Calendario from "@/components/Calendario";

export default function CalendarioPage() {
    return (<>
        <div className='container vh-100 py-4'>
            <div className='col-12 h-100 bg-white shadow p-3 rounded d-flex flex-column'>
                <div className='col-12 d-flex mb-3 align-items-center gap-2'>
                    <h5 className='mb-0 fs-5'>Próximas sessões</h5>
                </div>

                <Calendario />
            </div>
        </div>
    </>);
}