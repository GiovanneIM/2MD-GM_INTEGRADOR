import TreinamentoModel from '../models/TreinamentosModel.js';


class TreinamentoController {
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

            const resultado = await TreinamentoModel.listarTrOferecidos(id);

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

            const produtoId = await TreinamentoModel.criar(dadosTreinamento);

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

    /*  OBTER O Nº DE TREINAMENTOS EM QUE UM USUÁRIO FOI INSCRITO NOS ÚLTIMOS 6 MESES 
        separados por mês e estado */
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

    /*  OBTER O Nº DE TREINAMENTOS QUE UM USUÁRIO CRIOU NOS ÚLTIMOS 6 MESES
        separados por mês e estado */
    static async listarTrOferecidosSeisMeses(req, res) {

    }
}


export default TreinamentoController;