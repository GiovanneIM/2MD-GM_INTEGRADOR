import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
    responsive: true,
    plugins: {
        legend: { position: 'right' },
        title: { display: false }
    }
};

export default function EstadosTreinamentos({ treinamentos }) {
    const data = {
        labels: ['Pendentes', 'Cancelados', 'Em andamento', 'Concluídos'],
        datasets: [
            {
                label: 'Quantidade',
                data: [
                    treinamentos.filter(tr => tr.estado === 'Pendente').length,
                    treinamentos.filter(tr => tr.estado === 'Cancelado').length,
                    treinamentos.filter(tr => tr.estado === 'Em andamento').length,
                    treinamentos.filter(tr => tr.estado === 'Concluido').length
                ],
                backgroundColor: [
                    '#0d6efd',
                    '#dc3545',
                    '#ffc107',
                    '#198754'
                ]
            }
        ]
    };

    return (
        <div className="h-100 col-12 d-flex flex-column align-items-center">
            {/* Titulo */}
            <div className="col-12 d-flex flex-column">
                <h5 className="mb-0 fs-5">Estados dos Treinamentos</h5>
                <div className="text-muted" style={{ fontSize: '0.85rem' }}>Proporção dos seus treinamentos por estado</div>
            </div>

            <Pie data={data} options={options} />
        </div>
    );
}
