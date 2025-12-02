import express from 'express';
import TreinamentoController from '../controllers/TreinamentosController.js';

const router = express.Router();

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À LISTAGEM DE TREINAMENTOS */

// Listar TODOS os treinamentos
router.get('/', TreinamentoController.listarTodos)

// Listar um treinamentos específico com id = idTreinamento
router.get('/:idTreinamento', TreinamentoController.listarTreinamento)

// Listar participantes de um treinamentos específico
router.get('/:idTreinamento/participantes', TreinamentoController.listarParticipantes)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONADAS AO CICLO DE VIDA DE UM TREINAMENTO */

// Criar um treinamento
router.post('/', TreinamentoController.criarTreinamento)

// Atualizar estado de um treinamento
router.post('/:idTreinamento/atualizarEstado', TreinamentoController.atualizarEstado)

// Atualizar informações de um treinamento
router.post('/:idTreinamento/atualizarInfos', TreinamentoController.atualizarInfos)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À TREINAMENTOS EM QUE UM USUÁRIO OFERECE OU PARTICIPA */

// Listar treinamentos em que um usuario esteja inscrito como participante
router.get('/participante/:idUsuario', TreinamentoController.listarTrParticipados)

// Listar treinamentos criados por um usuario
router.get('/criador/:idUsuario', TreinamentoController.listarTrOferecidos)


// Listar o número de treinamentos em que um usuario foi inscrito nos últimos 6 meses por estado
router.get('/participante/:idUsuario/seisMeses', TreinamentoController.listarTrParticipadosSeisMeses)

// Listar o número de treinamentos que um usuario criou nos últimos 6 meses por estado
router.get('/criador/:idUsuario/seisMeses', TreinamentoController.listarTrOferecidosSeisMeses)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

/* ROTAS RELACIONAS À SESSÕES DE UM TREINAMENTO */

// Listar sessões de um treinamentos específico
router.get('/:idTreinamento/sessoes', TreinamentoController.listarSessoes)

// Criar uma sessão em um treinamentos específico
router.post('/:idTreinamento/criarSessao', TreinamentoController.criarSessao)

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =

export default router;

