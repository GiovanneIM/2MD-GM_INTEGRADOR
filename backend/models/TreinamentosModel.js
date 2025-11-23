import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class TreinamentoModel {

    /* LISTAR TODOS OS TREINAMENTOS */
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

    /* LISTAR TODOS OS TREINAMENTOS DE UM PARTICIPANTE */
    static async listarTrParticipante(id) {
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

    /* LISTAR TODOS OS TREINAMENTOS OFERECIDOS */
    static async listarTrOferecidos(id) {
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

    /* CRIAR UM NOVO TREINAMENTO */
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
                const participacao = { idTreinamento, idParticipante }

                create('participacoes', participacao)
            })

            return idTreinamento;
        } catch (error) {
            console.error('Erro ao criar treinamento:', error);
            throw error;
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES 
        separados por mês e estado */
    static async listarTrParticipanteSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                const sql = `
                    SELECT
                        DATE_FORMAT(data_criacao, '%b') AS mes,
                        estado,
                        COUNT(*) AS total,
                        MONTH(data_criacao) AS mes_num
                    FROM treinamentos
                    WHERE 
                        data_criacao >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
                        AND idCriador = 2
                    GROUP BY mes, mes_num, estado
                    ORDER BY mes_num, estado;
                `;

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

    /*  OBTER O Nº DE TREINAMENTOS QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES
        separados por mês e estado */
    static async listarTrOferecidosSeisMeses(req, res) {

    }
}


export default TreinamentoModel;