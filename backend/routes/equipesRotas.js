import express, { Router } from 'express';
import EquipesController from '../controllers/EquipesController.js';

const router = express.Router();

// Listar TODAS as equipes
router.get('/', EquipesController.listarTodos)

// Listar uma equipe ESPECÍFICA
router.get('/:id', EquipesController.listarEquipe)

// Listar os MEMBROS de uma equipe ESPECÍFICA
router.get('/:id/membros', EquipesController.listarMembros)    

// Listar os FTs de uma equipe ESPECÍFICA
router.get('/:id/ft', EquipesController.listarFTs)

// Listar os MTs de uma equipe ESPECÍFICA
router.get('/:id/mt', EquipesController.listarMTs)


export default router;
