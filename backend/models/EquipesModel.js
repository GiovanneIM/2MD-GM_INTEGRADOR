import { create, read, update, deleteRecord, getConnection } from '../config/database.js';

class EquipesModel {

    // LISTAR EQUIPES
    static async listarTodos() {
        try {
            const connection = await getConnection();

            try {
                const sql = 'SELECT * FROM equipes ORDER BY id';

                const [equipes] = await connection.query(sql);

                return {
                    equipes
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar equipes:', error);
            throw error;
        }
    }

    // LISTAR UMA EQUIPE ESPECÍFICA
    static async listarEquipe(idEquipe) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT * FROM equipes WHERE id = ${idEquipe}`;

                const [equipe] = await connection.query(sql);

                return {
                    equipe
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar equipe:', error);
            throw error;
        }
    }

    // LISTAR OS MEMBROS DE UMA EQUIPE
    static async listarMembros(idEquipe) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT id, nome, email, tipo, id_equipe FROM usuarios u WHERE u.id_equipe = ${idEquipe};`;

                const [membros] = await connection.query(sql);

                return {
                    membros
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar membros:', error);
            throw error;
        }
    }

    // LISTAR OS FTs DE UMA EQUIPE
    static async listarFTs(idEquipe) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT id, nome, email, tipo, id_equipe FROM usuarios u WHERE u.id_equipe = ${idEquipe} AND u.tipo = 'ft';`;

                const [membros] = await connection.query(sql);

                return {
                    membros
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar membros:', error);
            throw error;
        }
    }

    // LISTAR OS MTs DE UMA EQUIPE
    static async listarMTs(idEquipe) {
        try {
            const connection = await getConnection();

            try {
                const sql = `SELECT id, nome, email, tipo, id_equipe FROM usuarios u WHERE u.id_equipe = ${idEquipe} AND tipo = 'mt';`;

                const [membros] = await connection.query(sql);

                return {
                    membros
                };
            } finally {
                connection.release();
            }

        } catch (error) {
            console.error('Erro ao listar membros:', error);
            throw error;
        }
    }
}


export default EquipesModel;