import express, { Router } from 'express';
import TimesController from '../controllers/TimesController';

const router = express.Router();

// Listar TODOS os treinamentos
router.get('/', TimesController.listarTodos)




export default router;



/*

GET  - Listar TODOS os treinamentos

*/