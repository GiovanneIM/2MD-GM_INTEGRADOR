export default function EstadoTreinamento({ estado }) {

    /* Objeto para as cores do estado */
    const Status = {
        "Sessao": ["info", "fa-clock"],
        "Pendente": ["primary", "fa-question-circle"],
        "Em andamento": ["warning", "fa-cogs"],
        "Concluido": ["success", "fa-check"],
        "Cancelado": ["danger", "fa-xmark"],
    };

    return (<>
        <div
            className={`flex-shrink-0 bg-${Status[estado][0]} bg-opacity-10 rounded d-flex justify-content-center align-items-center`}
            style={{ width: '2.5rem', height: '2.5rem' }}
        >
            <i className={`fas ${Status[estado][1]} text-${Status[estado][0]}`} />
        </div>
    </>);
}