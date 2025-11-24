import express, { Router } from 'express';
import EquipesController from '../controllers/EquipesController.js';

const router = express.Router();

router.get('/', EquipesController.listarTodos)      // Listar TODAS as equipes
router.get('/:id', EquipesController.listarEquipe)      // Listar uma equipe ESPECÍFICA

router.get('/:id/membros', EquipesController.listarMembros)    // Listar os MEMBROS de uma equipe ESPECÍFICA
router.get('/:id/ft', EquipesController.listarFTs)    // Listar os MEMBROS de uma equipe ESPECÍFICA
router.get('/:id/mt', EquipesController.listarMTs)    // Listar os MEMBROS de uma equipe ESPECÍFICA


export default router;
