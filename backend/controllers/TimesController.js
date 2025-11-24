import TimesModel from '../models/TimesModel';
import { fileURLToPath } from 'url';
import path from 'path';


class TimesController {

    static async listarTodos(req, res) {
        try {

            const resultado = await TimesModel.listarTodos(); // <-- MUDANÇA AQUI

            res.status(200).json({
                sucesso: true,
                dados: resultado.times
            });
            
        } catch (error) {
            console.error('Erro ao listar as times:', error);
            res.status(500).json({
                sucesso: false,
                erro: 'Erro interno do servidor',
                mensagem: 'Não foi possível listar os times'
            });
        }
    }
}


export default TimesController;