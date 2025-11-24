import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class TimesModel {

    // Listar treinamentos
    static async listarTodos() {
        try {
            const connection = await getConnection();

            try {
                const sql = 'SELECT * FROM times ORDER BY id';

                const [times] = await connection.query(sql);

                return {
                    times
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar times:', error);
            throw error;
        }
    }
}


export default TimesModel;