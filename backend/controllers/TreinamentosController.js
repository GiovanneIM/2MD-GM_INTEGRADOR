import TreinamentoModel from '../models/TreinamentosModel.js';


class TreinamentoController {

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À LISTAGEM DE TREINAMENTOS */

    /* LISTAR TODOS OS TREINAMENTOS */
    static async listarTodos(req, res) {
        try {
            // Obtendo e validando os valores da paginação
            const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
            const limite = Math.max(1, Math.min(50, parseInt(req.query.limite) || 10));

            // Calculando o offset (Ponto de partida)
            const offset = (pagina - 1) * limite;

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTodos(limite, offset);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    total: resultado.total,
                    totalPaginas: Math.ceil(resultado.total / limite),
                    treinamentos: resultado.treinamentos,
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos'
            });
        }
    }

    /* LISTAR TREINAMENTO ESPECÍFICO */
    static async listarTreinamento(req, res) {
        try {
            // Obtendo o id do treinamento
            const idTreinamento = parseInt(req.params.idTreinamento);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTreinamento(idTreinamento);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    treinamento: resultado.treinamento,
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar o treinamento'
            });
        }
    }

    /* LISTAR OS PARTICIPANTES DE UM TREINAMENTO ESPECÍFICO */
    static async listarParticipantes(req, res) {
        try {
            // Obtendo o id do treinamento
            const idTreinamento = parseInt(req.params.idTreinamento);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarParticipantes(idTreinamento);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    participantes: resultado.participantes
                },
            });

        } catch (error) {
            console.error('Erro ao listar participantes:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os participantes'
            });
        }
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONADAS AO CICLO DE VIDA DE UM TREINAMENTO */

    /* CRIAR UM NOVO TREINAMENTO */
    static async criarTreinamento(req, res) {
        try {
            // Obtendo os dados do treinamento
            const { nome, descricao, participantes, idCriador } = req.body;

            // Preparando os dados do treinamento
            const dadosTreinamento = {
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : '',
                idCriador: idCriador,
                participantes: participantes,
            };

            // Chamando o model para fazer a inserção dos dados
            const produtoId = await TreinamentoModel.criarTreinamento(dadosTreinamento);

            // Retornando os dados do treinamento
            res.status(201).json({
                sucesso: true,
                mensagem: 'Treinamento criado com sucesso',
                dados: {
                    id: produtoId,
                    ...dadosTreinamento
                }
            });

        } catch (error) {
            console.error('Erro ao criar treinamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar o treinamento'
            });
        }
    }

    /* ATUALIZAR O ESTADO DE UM TREINAMENTO */
    static async atualizarEstado(req, res) {
        try {
            // Obtendo o id do treinamento
            const idTreinamento = parseInt(req.params.idTreinamento);

            // Obtendo o estado para qual o treinamento deve ser alterado
            const { estado } = req.body;

            // Chamando o model para fazer alteração do estado
            const resultado = await TreinamentoModel.atualizarEstado(idTreinamento, estado);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                mensagem: 'Estado atualizado',
                dados: { treinamento: resultado.treinamento, },
            });
        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o estado do treinamento'
            });
        }
    }

    /* ATUALIZANDO OS DADOS DE UM TREINAMENTO */
    static async atualizarInfos(req, res) {
        try {
            // Obtendo o id do treinamento
            const idTreinamento = parseInt(req.params.idTreinamento);

            // Obtendo os novos dados do treinamento
            const { nome, descricao } = req.body;

            // Chamando o model para fazer a requisição
            const resultado = await TreinamentoModel.atualizarInfos(idTreinamento, nome, descricao);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                mensagem: 'Informações atualizado',
                dados: { treinamento: resultado.treinamento, },
            });
        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar as informações do treinamento'
            });
        }
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À TREINAMENTOS EM QUE UM USUÁRIO OFERECE OU PARTICIPA */

    /* LISTAR TODOS OS TREINAMENTOS DE UM PARTICIPANTE */
    static async listarTrParticipados(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Obtendo e validando os valores da paginação
            const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
            const limite = Math.max(1, Math.min(50, parseInt(req.query.limite) || 10));

            // Calculando o offset (Ponto de partida)
            const offset = (pagina - 1) * limite;

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTrParticipados(idUsuario, limite, offset);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    total: resultado.total,
                    totalPaginas: Math.ceil(resultado.total / limite),
                    treinamentos: resultado.treinamentos,
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos participados pelo usuário:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos participados pelo usuário'
            });
        }
    }

    /* LISTAR TODOS OS TREINAMENTOS OFERECIDOS POR UM USUÁRIO */
    static async listarTrOferecidos(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Obtendo e validando os valores da paginação
            const pagina = Math.max(1, parseInt(req.query.pagina) || 1);
            const limite = Math.max(1, Math.min(50, parseInt(req.query.limite) || 10));

            // Calculando o offset (Ponto de partida)
            const offset = (pagina - 1) * limite;

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTrOferecidos(idUsuario, limite, offset);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    total: resultado.total,
                    totalPaginas: Math.ceil(resultado.total / limite),
                    treinamentos: resultado.treinamentos,
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos oferecidos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos oferecidos pelo usuário'
            });
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarTrParticipadosSeisMeses(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTrParticipadosSeisMeses(idUsuario);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    treinamentos: resultado.treinamentos
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos participados nos últimos 6 meses:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos participados nos últimos 6 meses'
            });
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarTrOferecidosSeisMeses(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarTrOferecidosSeisMeses(idUsuario);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    treinamentos: resultado.treinamentos
                },
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos oferecidos nos últimos 6 meses:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos oferecidos nos últimos 6 meses'
            });
        }
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À SESSÕES DE UM TREINAMENTO */

    /* LISTAR AS SESSÕES DE UM ESPECÍFICO */
    static async listarSessoes(req, res) {
        try {
            // Obtendo o id do treinamento
            const idTreinamento = parseInt(req.params.idTreinamento);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarSessoes(idTreinamento);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    sessoes: resultado.sessoes
                }
            });

        } catch (error) {
            console.error('Erro ao listar sessões:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as sessões'
            });
        }
    }

    /* CRIAR UMA SESSÃO */
    static async criarSessao(req, res) {
        try {
            // Obtendo dados da sessão
            const { dia, hora_inicio, hora_fim, localidade, idTreinamento } = req.body;

            // Preparando dados do treinamento
            const dadosSessao = { dia, hora_inicio, hora_fim, localidade, idTreinamento };

            // Chamando o model para fazer o insert
            const sessaoId = await TreinamentoModel.criarSessao(dadosSessao);

            // Retornando as informações da sessão
            res.status(201).json({
                sucesso: true,
                mensagem: 'Sessão criada com sucesso',
                dados: {
                    id: sessaoId,
                    ...dadosSessao
                }
            });

        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível criar a sessão'
            });
        }
    }

    /* CANCELAR UMA SESSÃO */
    static async cancelarSessao(req, res) {
        try {
            // Obtendo o id do treinamento
            const idSessao = parseInt(req.params.idSessao);

            // Chamando o model para fazer o cancelamento da sessão
            await TreinamentoModel.cancelarSessao(idSessao);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                mensagem: 'Sessão cancelada',
            });
        } catch (error) {
            console.error('Erro ao cancelar sessão:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível cancelar a sessão'
            });
        }
    }

    /* ATUALIZAR O ESTADO DE UMA SESSÃO */
    static async atualizarEstadoSessao(req, res) {
        try {
            // Obtendo o id do treinamento
            const idSessao = parseInt(req.params.idSessao);

            // Obtendo o estado para qual o treinamento deve ser alterado
            const { estado } = req.body;

            // Chamando o model para fazer alteração do estado
            const resultado = await TreinamentoModel.atualizarEstadoSessao(idSessao, estado);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                mensagem: 'Estado atualizado',
                dados: { sessao: resultado.sessao, },
            });
        } catch (error) {
            console.error('Erro ao criar sessão:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível atualizar o estado da sessão'
            });
        }
    }

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONADAS ÀS SESSÕES DE UM USUÁRIO */

    /*  OBTER O Nº DE SESSÕES EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarSessoesParticipadasSeisMeses(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarSessoesParticipadasSeisMeses(idUsuario);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    sessoes: resultado.sessoes
                },
            });

        } catch (error) {
            console.error('Erro ao listar sessões participadas nos últimos 6 meses:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as sessões participadas nos últimos 6 meses'
            });
        }
    }

    /*  OBTER O Nº DE SESSÕES QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarSessoesOferecidasSeisMeses(req, res) {
        try {
            // Obtendo o id do usuário
            const idUsuario = parseInt(req.params.idUsuario);

            // Chamando o model para fazer a consulta
            const resultado = await TreinamentoModel.listarSessoesOferecidasSeisMeses(idUsuario);

            // Respondendo a requisição
            res.status(200).json({
                sucesso: true,
                dados: {
                    sessoes: resultado.sessoes
                },
            });

        } catch (error) {
            console.error('Erro ao listar sessões oferecidas nos últimos 6 meses:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as sessões oferecidas nos últimos 6 meses'
            });
        }
    }

}

export default TreinamentoController;