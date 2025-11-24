import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class TreinamentoModel {

    // Listar todos os treinamentos
    static async listarTodos() {
        try {
            const connection = await getConnection();

            try {
                const sql = 'SELECT * FROM treinamentos ORDER BY id DESC';

                const [treinamentos] = await connection.query(sql);

                return {
                    treinamentos
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar Treinamentos:', error);
            throw error;
        }
    }

    // Listar todos os treinamentos de um participante
    static async listarTreinamentosParticipante(id) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT * FROM treinamentos t INNER JOIN participacoes p on p.idTreinamento = t.id WHERE p.idParticipante = ${id} ORDER BY t.id DESC`;

                const [treinamentos] = await connection.query(sql);

                return {
                    treinamentos
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamentos participados:', error);
            throw error;
        }
    }

    // Listar todos os treinamentos oferecidos
    static async listarTreinamentosOferecidos(id) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT * FROM treinamentos WHERE idCriador = ${id} ORDER BY id DESC`;

                const [treinamentos] = await connection.query(sql);

                return {
                    treinamentos
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamento oferecidos:', error);
            throw error;
        }
    }

    // Criar um treinamento
    static async criar(dadosTreinamento) {
        try {
            const treinamento = {
                nome: dadosTreinamento.nome,
                descricao: dadosTreinamento.descricao,
                idCriador: dadosTreinamento.idCriador,
                numSessoes: 0
            }

            // return await create('treinamentos', dadosTreinamento);
            const idTreinamento = await create('treinamentos', treinamento);

            dadosTreinamento.participantes.map((idParticipante) => {
                const participacao = {idTreinamento, idParticipante}

                create('participacoes', participacao)
            })

            return idTreinamento;
        } catch (error) {
            console.error('Erro ao criar treinamento:', error);
            throw error;
        }
    }
}


export default TreinamentoModel;