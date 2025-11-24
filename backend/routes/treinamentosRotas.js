import express, { Router } from 'express';
import TreinamentoController from '../controllers/TreinamentosController.js';

const router = express.Router();

// Listar TODOS os treinamentos
router.get('/', TreinamentoController.listarTodos)

// Listar treinamentos realizados por usuario
router.get('/:id', TreinamentoController.listarTreinamentosParticipante)

// Listar treinamentos oferecidos por um usuario
router.get('/criador/:id', TreinamentoController.listarTreinamentosOferecidos)

// Criar treinamento
router.post('/', TreinamentoController.criarTreinamento)





export default router;



/*

GET  - Listar TODOS os treinamentos
POST - Criar treinamento


GET  - Acessar 1 treinamento específico

*/