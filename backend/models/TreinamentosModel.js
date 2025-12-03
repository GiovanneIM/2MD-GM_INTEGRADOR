import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class TreinamentoModel {

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À LISTAGEM DE TREINAMENTOS */

    /* LISTAR TODOS OS TREINAMENTOS (Com paginação) */
    static async listarTodos(limite, offset) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter os treinamentos e os nomes dos criadores
                const sqlTreinamentos = `
                    SELECT 
                        t.*, 
                        u.nome AS criador
                    FROM treinamentos t 
                    INNER JOIN usuarios u ON u.id = t.idCriador
                    ORDER BY t.id DESC 
                    LIMIT ? OFFSET ?
                ;`;

                // Comando para obter o total de treinamentos
                const sqlTotal = `
                    SELECT COUNT(*) AS total
                    FROM treinamentos
                ;`;

                // Fazendo as consultas
                const [[totalResult]] = await connection.query(sqlTotal);
                const [treinamentos] = await connection.query(sqlTreinamentos, [limite, offset]);

                // Retornando o total e os treinamentos da página
                return {
                    total: totalResult.total,
                    treinamentos,
                };

            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar Treinamentos:', error);
            throw error;
        }
    }

    /* LISTAR TREINAMENTO ESPECÍFICO */
    static async listarTreinamento(id) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o treinamento e o nome de seu criador
                const sql = `
                    SELECT 
                        t.*, 
                        u.nome AS criador
                    FROM treinamentos t 
                    INNER JOIN usuarios u ON u.id = t.idCriador
                    WHERE t.id = ${id};
                `;

                // Fazendo a consulta
                const [[treinamento]] = await connection.query(sql);

                // Retornando o treinamento
                return { treinamento };

            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar Treinamento:', error);
            throw error;
        }
    }

    /* LISTAR OS PARTICIPANTES DE UM TREINAMENTO ESPECÍFICO */
    static async listarParticipantes(idTreinamento) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter os participantes do treinamento
                const sql = `
                    SELECT u.*
                    FROM participacoes p
                    INNER JOIN usuarios u ON p.idParticipante = u.id
                    WHERE p.idTreinamento = ${idTreinamento};
                `;

                // Fazendo a consulta
                const [participantes] = await connection.query(sql);

                // Tirando a senha dos participantes
                const participantesSemSenha = participantes.map(({ senha, ...resto }) => resto);

                // Retornando os participantes
                return { participantesSemSenha };

            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar participantes:', error);
            throw error;
        }
    }


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONADAS AO CICLO DE VIDA DE UM TREINAMENTO */

    /* CRIAR UM NOVO TREINAMENTO */
    static async criarTreinamento(dadosTreinamento) {
        try {
            // Separando os dados do treinamento
            const treinamento = {
                nome: dadosTreinamento.nome,
                descricao: dadosTreinamento.descricao,
                idCriador: dadosTreinamento.idCriador,
                numSessoes: 0
            }

            // Inserindo o treinamento na tabela treinamentos
            const idTreinamento = await create('treinamentos', treinamento);

            // Inserindo as participações do treinamento na tabela participacoes
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

    /* ATUALIZAR O ESTADO DE UM TREINAMENTO */
    static async atualizarEstado(idTreinamento, estado) {
        try {
            const connection = await getConnection();

            try {
                // Fazendo a alteração do estado do treinamento
                const treinamento = await update('treinamentos', { estado: estado }, `id = ${idTreinamento}`);

                // Retornando o treinamento atualizado
                return { treinamento }
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao atualizar o estado do treinamentos:', error);
            throw error;
        }
    }

    /* ATUALIZANDO OS DADOS DE UM TREINAMENTO */
    static async atualizarInfos(idTreinamento, nome, descricao) {
        try {
            const connection = await getConnection();

            try {
                // Fazendo a alteração dos dados do treinamentos
                const treinamento = await update('treinamentos', { nome: nome, descricao: descricao }, `id = ${idTreinamento}`);

                // Retornando o treinamento atualizado
                return { treinamento }
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao atualizar o estado do treinamentos:', error);
            throw error;
        }
    }


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À TREINAMENTOS EM QUE UM USUÁRIO OFERECE OU PARTICIPA */

    /* LISTAR TODOS OS TREINAMENTOS DE UM PARTICIPANTE */
    static async listarTrParticipados(idUsuario, limite, offset) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter os treinamentos nos quais um usuário está participando
                const sqlTreinamentos = `
                    SELECT 
                        t.*,
                        u.nome AS criador
                    FROM treinamentos t
                    INNER JOIN participacoes p on p.idTreinamento = t.id
                    INNER JOIN usuarios u ON u.id = t.idCriador
                    WHERE p.idParticipante = ?
                    ORDER BY t.id DESC
                    LIMIT ? OFFSET ?
                `;

                // Comando para obter o total de treinamentos
                const sqlTotal = `
                    SELECT COUNT(*) AS total
                    FROM treinamentos
                ;`;

                // Fazendo as consultas
                const [[totalResult]] = await connection.query(sqlTotal);
                const [treinamentos] = await connection.query(sqlTreinamentos, [idUsuario, limite, offset]);

                // Retornando o total e os treinamentos da página
                return {
                    total: totalResult.total,
                    treinamentos,
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
    static async listarTrOferecidos(idUsuario, limite, offset) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter os treinamentos que o usuário criou
                const sqlTreinamentos = `
                    SELECT 
                        t.*,
                        u.nome AS criador
                    FROM treinamentos t
                    INNER JOIN usuarios u ON u.id = t.idCriador
                    WHERE t.idCriador = ?
                    ORDER BY t.id DESC
                    LIMIT ? OFFSET ?
                `;

                // Comando para obter o total de treinamentos
                const sqlTotal = `
                    SELECT COUNT(*) AS total
                    FROM treinamentos
                ;`;

                // Fazendo as consultas
                const [[totalResult]] = await connection.query(sqlTotal);
                const [treinamentos] = await connection.query(sqlTreinamentos, [idUsuario, limite, offset]);

                // Retornando o total e os treinamentos da página
                return {
                    total: totalResult.total,
                    treinamentos,
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamento oferecidos:', error);
            throw error;
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarTrParticipadosSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o número de treinamentos por estados
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
                    ORDER BY um.data_base, estado
                ;`

                // Fazendo a consulta
                const [treinamentos] = await connection.query(sql);

                // Retornando os treinamentos
                return { treinamentos };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamentos participados:', error);
            throw error;
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarTrOferecidosSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o número de treinamentos por estados
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
                    ORDER BY um.data_base, estado
                ;`

                // Fazendo a consulta
                const [treinamentos] = await connection.query(sql);

                // Retornando os treinamentos
                return { treinamentos };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamentos oferecidos:', error);
            throw error;
        }
    }


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À SESSÕES DE UM TREINAMENTO */

    /* LISTAR AS SESSÕES DE UM ESPECÍFICO */
    static async listarSessoes(idTreinamento) {

        function formatarData(data) {
            const dia = String(data.getDate()).padStart(2, "0");
            const mes = String(data.getMonth() + 1).padStart(2, "0");
            const ano = data.getFullYear();

            return `${dia}/${mes}/${ano}`;
        }

        function formatarHora(hora) {
            const [horas, minutos, segundos] = hora.split(':')

            return `${horas}:${minutos}`;
        }

        function formatarDataHora(data) {
            // data
            const dia = String(data.getDate()).padStart(2, "0");
            const mes = String(data.getMonth() + 1).padStart(2, "0");
            const ano = data.getFullYear();

            // hora
            const horas = String(data.getHours()).padStart(2, "0");
            const minutos = String(data.getMinutes()).padStart(2, "0");

            return {
                data: `${dia}/${mes}/${ano}`,
                hora: `${horas}:${minutos}`
            };
        }


        try {
            const connection = await getConnection();

            try {
                // Comando para obter as sessões de um treinamento
                const sql = `
                    SELECT * FROM sessoes 
                    WHERE idTreinamento = ${idTreinamento} 
                    ORDER BY dia, hora_inicio;
                `;

                // Fazendo a consulta
                const [sessoes] = await connection.query(sql);

                // Ajeitando os dados
                sessoes.map((s) => {
                    s.data_criacao = formatarDataHora(s.data_criacao);
                    s.data_atualizacao = formatarDataHora(s.data_atualizacao);
                    s.dia = formatarData(s.dia);
                    s.hora_inicio = formatarHora(s.hora_inicio);
                    s.hora_fim = formatarHora(s.hora_fim);
                })

                // Retornando as sessões
                return { sessoes };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar Sessões:', error);
            throw error;
        }
    }

    /* CRIAR UMA NOVA SESSÃO */
    static async criarSessao(dadosSessao) {
        try {
            // Criando o objeto com os dados da sessão
            const sessao = {
                localidade: dadosSessao.localidade,
                idTreinamento: dadosSessao.idTreinamento,
                dia: dadosSessao.dia,
                hora_inicio: dadosSessao.hora_inicio,
                hora_fim: dadosSessao.hora_fim,
            }

            // Inserindo a sessão na tabela
            const idSessao = await create('sessoes', sessao);

            // Retornando o id da sessão
            return idSessao;

        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            throw error;
        }
    }


    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

    /*  OBTER O Nº DE SESSÕES EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarSessoesParticipadasSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o número de treinamentos por estados
                const sql = `
                    WITH RECURSIVE ultimos_meses AS (
                        SELECT 
                            DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
                        UNION ALL
                        SELECT 
                            DATE_ADD(data_base, INTERVAL 1 MONTH)
                        FROM ultimos_meses
                        WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                    )
                    SELECT 
                        DATE_FORMAT(data_base, '%b') AS mes,
                        'estado' AS estado,
                        0 AS total
                    FROM ultimos_meses;
                ;`

                // Fazendo a consulta
                const [sessoes] = await connection.query(sql);

                // Retornando os treinamentos
                return { sessoes };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar treinamentos participados:', error);
            throw error;
        }
    }

    /*  OBTER O Nº DE SESSÕES QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarSessoesOferecidasSeisMeses(idUsuario) {
        try {
            const connection = await getConnection();

            try {
                // Comando para obter o número de treinamentos por estados
                const sql = `
                    WITH RECURSIVE ultimos_meses AS (
                        SELECT 
                            DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 5 MONTH), '%Y-%m-01') AS data_base
                        UNION ALL
                        SELECT 
                            DATE_ADD(data_base, INTERVAL 1 MONTH)
                        FROM ultimos_meses
                        WHERE data_base < DATE_FORMAT(CURDATE(), '%Y-%m-01')
                    ) 
                    SELECT 
                        DATE_FORMAT(data_base, '%b') AS mes,
                        'estado' AS estado,
                        0 AS total
                    FROM ultimos_meses;
                ;`

                // Fazendo a consulta
                const [sessoes] = await connection.query(sql);

                // Retornando os treinamentos
                return { sessoes };
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