import EquipesModel from '../models/EquipesModel.js'
import { fileURLToPath } from 'url';
import path from 'path';


class EquipesController {

    /* LISTAR TODAS AS EQUIPES */
    static async listarTodos(req, res) {
        try {

            const resultado = await EquipesModel.listarTodos(); // <-- MUDANÇA AQUI

            res.status(200).json({
                sucesso: true,
                dados: resultado.equipes
            });
            
        } catch (error) {
            console.error('Erro ao listar as equipes:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar as equipes'
            });
        }
    }

    /* LISTAR UMA EQUIPE ESPECÍFICA */
    static async listarEquipe(req, res) {
        try {
            const idEquipe = parseInt(req.params.id)

            const resultado = await EquipesModel.listarEquipe(idEquipe);

            res.status(200).json({
                sucesso: true,
                dados: resultado.equipe
            });
            
        } catch (error) {
            console.error('Erro ao listar a equipe:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar a equipe'
            });
        }
    }

    /* LISTAR MEMBROS DE UMA EQUIPE ESPECÍFICA */
    static async listarMembros(req, res) {
        try {
            const idEquipe = parseInt(req.params.id)

            const resultado = await EquipesModel.listarMembros(idEquipe);

            res.status(200).json({
                sucesso: true,
                dados: resultado.membros
            });

        } catch (error){
            console.error('Erro ao listar os membros da equipe:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os membros da equipe'
            });
        }
    }

    /* LISTAR FTs DE UMA EQUIPE ESPECÍFICA */
    static async listarFTs(req, res) {
        try {
            const idEquipe = parseInt(req.params.id)

            const resultado = await EquipesModel.listarFTs(idEquipe);

            res.status(200).json({
                sucesso: true,
                dados: resultado.membros
            });

        } catch (error){
            console.error('Erro ao listar os membros da equipe:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os FTs da equipe'
            });
        }
    }

    /* LISTAR MTs DE UMA EQUIPE ESPECÍFICA */
    static async listarMTs(req, res) {
        try {
            const idEquipe = parseInt(req.params.id)

            const resultado = await EquipesModel.listarMTs(idEquipe);

            res.status(200).json({
                sucesso: true,
                dados: resultado.membros
            });

        } catch (error){
            console.error('Erro ao listar os membros da equipe:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os MTs da equipe'
            });
        }
    }
}


export default EquipesController;