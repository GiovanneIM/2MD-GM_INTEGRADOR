import TreinamentoModel from '../models/TreinamentosModel.js';


class TreinamentoController {

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONAS À LISTAGEM DE TREINAMENTOS */

    /* LISTAR TODOS OS TREINAMENTOS */
    static async listarTodos(req, res) {
        try {

            const resultado = await TreinamentoModel.listarTodos();

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamentos
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
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTreinamento(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamento
            });

        } catch (error) {
            console.error('Erro ao listar treinamento:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamento'
            });
        }
    }

    static async listarParticipantes(req, res) {
        try {
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarParticipantes(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado.participantes
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
    /* ROTAS RELACIONAS À TREINAMENTOS EM QUE UM USUÁRIO OFERECE OU PARTICIPA */

    /* LISTAR TODOS OS TREINAMENTOS DE UM PARTICIPANTE */
    static async listarTrParticipante(req, res) {
        try {
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTrParticipante(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamentos
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos participados:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos participados'
            });
        }
    }

    /* LISTAR TODOS OS TREINAMENTOS OFERECIDOS */
    static async listarTrOferecidos(req, res) {
        try {
            const id = parseInt(req.params.id);
            const pagina = parseInt(req.params.pagina);

            const resultado = await TreinamentoModel.listarTrOferecidos(id, 10, (pagina - 1) * 10);

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamentos
            });

        } catch (error) {
            console.error('Erro ao listar treinamentos oferecidos:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os treinamentos oferecidos'
            });
        }
    }

    /*  OBTER O Nº DE TREINAMENTOS EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES separados por mês e estado */
    static async listarTrParticipanteSeisMeses(req, res) {
        try {
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTrParticipanteSeisMeses(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamentos
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
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTrOferecidosSeisMeses(id);

            res.status(200).json({
                sucesso: true,
                dados: resultado.treinamentos
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

    /* LISTAR TREINAMENTO ESPECÍFICO */
    static async listarSessoes(req, res) {
        try {
            const idTreinamento = parseInt(req.params.idTreinamento);

            const resultado = await TreinamentoModel.listarSessoes(idTreinamento);

            res.status(200).json({
                sucesso: true,
                dados: resultado.sessoes
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

            // Preparar dados do treinamento
            const dadosSessao = { dia, hora_inicio, hora_fim, localidade, idTreinamento };

            const sessaoId = await TreinamentoModel.criarSessao(dadosSessao);

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

    // = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
    /* ROTAS RELACIONADAS AO CICLO DE VIDA DE UM TREINAMENTO */

    /* CRIAR UM NOVO TREINAMENTO */
    static async criarTreinamento(req, res) {
        try {
            const { nome, descricao, participantes, idCriador } = req.body;

            // Preparar dados do treinamento
            const dadosTreinamento = {
                nome: nome.trim(),
                descricao: descricao ? descricao.trim() : '',
                participantes: participantes,
                idCriador: idCriador
            };

            const produtoId = await TreinamentoModel.criarTreinamento(dadosTreinamento);

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

    static async atualizarEstado(req, res) {
        try {
            const idTreinamento = parseInt(req.params.idTreinamento);
            const { estado } = req.body;

            const resultado = await TreinamentoModel.atualizarEstado(idTreinamento, estado);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Estado atualizado'
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

    static async atualizarInfos(req, res) {
        try {
            const idTreinamento = parseInt(req.params.idTreinamento);
            const { nome, descricao } = req.body;

            const resultado = await TreinamentoModel.atualizarInfos(idTreinamento, nome, descricao);

            res.status(200).json({
                sucesso: true,
                mensagem: 'Informações atualizado'
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
}

export default TreinamentoController;