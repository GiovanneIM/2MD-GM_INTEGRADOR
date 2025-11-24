import TreinamentoModel from '../models/TreinamentosModel.js';
import { fileURLToPath } from 'url';
import path from 'path';


class TreinamentoController {
    /* LISTA TODOS OS TREINAMENTOS */
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

    /* LISTA TODOS OS TREINAMENTOS DE UM PARTICIPANTE  */
    static async listarTreinamentosParticipante(req, res) {
        try {
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTreinamentosParticipante(id);

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

    /* LISTA TODOS OS TREINAMENTOS OFERECIDOS  */
    static async listarTreinamentosOferecidos(req, res) {
        try {
            const id = parseInt(req.params.id);

            const resultado = await TreinamentoModel.listarTreinamentosOferecidos(id);

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

    /* CRIA UM NOVO TREINAMENTO */
    static async criarTreinamento(req, res){
        try {
            const { nome, descricao, participantes, idCriador} = req.body;

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
}


export default TreinamentoController;