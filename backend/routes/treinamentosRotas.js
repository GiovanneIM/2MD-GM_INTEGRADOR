import express, { Router } from 'express';
import TreinamentoController from '../controllers/TreinamentosController.js';

const router = express.Router();

// Listar TODOS os treinamentos
router.get('/', TreinamentoController.listarTodos)

// Listar treinamentos específico
router.get('/treinamento/:id', TreinamentoController.listarTreinamento)

// Listar treinamentos realizados por usuario
router.get('/:id', TreinamentoController.listarTrParticipante)

// Listar treinamentos oferecidos por um usuario
router.get('/criador/:id', TreinamentoController.listarTrOferecidos)


// Listar o número de treinamentos em que um usuario foi inscrito nos últimos 6 meses por estado
router.get('/:id/seisMeses', TreinamentoController.listarTrParticipanteSeisMeses)

// Listar o número de treinamentos que um usuario criou nos últimos 6 meses por estado
router.get('/:id/criador/seisMeses', TreinamentoController.listarTrOferecidosSeisMeses)


// Criar treinamento
router.post('/', TreinamentoController.criarTreinamento)


// Listar sessões de um treinamentos específico
router.get('/treinamento/:idTreinamento/sessoes', TreinamentoController.listarSessoes)


export default router;



/*

GET  - Listar TODOS os treinamentos
POST - Criar treinamento


GET  - Acessar 1 treinamento específico

*/