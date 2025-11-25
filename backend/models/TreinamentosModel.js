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
                -- Criando uma lista com os últimos 6 meses
                WITH RECURSIVE ultimos_meses AS (
                    SELECT 
                        DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
                    UNION ALL
                    SELECT 
                        DATE_ADD(data_base, INTERVAL 1 MONTH)
                    FROM ultimos_meses
                    WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                )

                -- Coletando os treinamentos iniciados nos últimos 6 meses
                SELECT
                    DATE_FORMAT(um.data_base, '%b') AS mes,
                    COALESCE(t.estado, 'Sem treinamentos') AS estado,
                    COUNT(CASE WHEN p.idParticipante = 2 THEN 1 END) AS total
                FROM ultimos_meses um
                LEFT JOIN treinamentos t
                    ON MONTH(t.data_criacao) = MONTH(um.data_base)
                AND YEAR(t.data_criacao) = YEAR(um.data_base)
                LEFT JOIN participacoes p
                    ON p.idTreinamento = t.id
                GROUP BY um.data_base, estado
                ORDER BY um.data_base, estado;
                `

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
    static async listarTrOferecidosSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                const sql = `
                    -- Criando uma lista com os últimos 6 meses
                    WITH RECURSIVE ultimos_meses AS (
                        SELECT 
                            DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
                        UNION ALL
                        SELECT 
                            DATE_ADD(data_base, INTERVAL 1 MONTH)
                        FROM ultimos_meses
                        WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                    )
                    
                    -- Coletando os treinamentos criados nos últimos 6 meses
                    SELECT
                        DATE_FORMAT(um.data_base, '%b') AS mes,
                        COALESCE(t.estado, 'Sem registros') AS estado,
                        COALESCE(COUNT(t.id), 0) AS total
                    FROM ultimos_meses um
                    LEFT JOIN treinamentos t
                        ON MONTH(t.data_criacao) = MONTH(um.data_base)
                        AND YEAR(t.data_criacao) = YEAR(um.data_base)
                        AND t.idCriador = ${idUsuario}
                    GROUP BY mes, estado, um.data_base
                    ORDER BY um.data_base, estado;
                `

                const [treinamentos] = await connection.query(sql);

                return {
                    treinamentos
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamentos oferecidos:', error);
            throw error;
        }
    }
}


export default TreinamentoModel;