import express, { Router } from 'express';
import TreinamentoController from '../controllers/TreinamentosController.js';

const router = express.Router();

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À LISTAGEM DE TREINAMENTOS */

// Listar TODOS os treinamentos
router.get('/', TreinamentoController.listarTodos)

// Listar treinamentos específico
router.get('/treinamento/:id', TreinamentoController.listarTreinamento)

// Listar participantes de um treinamentos específico
router.get('/treinamento/:id/participantes', TreinamentoController.listarParticipantes)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À TREINAMENTOS EM QUE UM USUÁRIO OFERECE OU PARTICIPA */

// Listar treinamentos realizados por usuario
router.get('/:id', TreinamentoController.listarTrParticipante)

// Listar treinamentos oferecidos por um usuario
router.get('/criador/:id/:pagina', TreinamentoController.listarTrOferecidos)


// Listar o número de treinamentos em que um usuario foi inscrito nos últimos 6 meses por estado
router.get('/:id/seisMeses', TreinamentoController.listarTrParticipanteSeisMeses)

// Listar o número de treinamentos que um usuario criou nos últimos 6 meses por estado
router.get('/:id/criador/seisMeses', TreinamentoController.listarTrOferecidosSeisMeses)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À SESSÕES DE UM TREINAMENTO */

// Listar sessões de um treinamentos específico
router.get('/treinamento/:idTreinamento/sessoes', TreinamentoController.listarSessoes)

// Criar uma sessão em um treinamentos específico
router.post('/treinamento/:idTreinamento/criarSessao', TreinamentoController.criarSessao)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONADAS AO CICLO DE VIDA DE UM TREINAMENTO */

// Criar treinamento
router.post('/', TreinamentoController.criarTreinamento)

// Atualizar estado de um treinamento
router.post('/treinamento/:idTreinamento/atualizarEstado', TreinamentoController.atualizarEstado)

// Atualizar informações de um treinamento
router.post('/treinamento/:idTreinamento/atualizarInfos', TreinamentoController.atualizarInfos)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

export default router;

