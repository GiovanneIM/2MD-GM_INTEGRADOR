import express from 'express';
import AuthController from '../controllers/AuthController.js';
import { authMiddleware, adminMiddleware } from '../middlewares/authMiddleware.js';

// ADICIONADO PELO GPT
// import { cookieToAuthHeader } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Rotas públicas de autenticação
router.post('/login', AuthController.login);
router.post('/registrar', AuthController.registrar);

// Rotas protegidas (precisam de autenticação)
router.get('/perfil', authMiddleware, AuthController.obterPerfil);
// Rota com o middleware do GPT
//router.get('/perfil', cookieToAuthHeader, authMiddleware, AuthController.obterPerfil);

// Rotas OPTIONS para CORS (preflight requests)
router.options('/login', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

router.options('/registrar', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.sendStatus(200);
});

router.options('/perfil', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

// Rota para atualizar perfil do usuário logado
router.put(
    '/atualizarPerfil',
    authMiddleware,
    AuthController.atualizarPerfil
);


// Preflight para CORS
router.options('/atualizarPerfil', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.sendStatus(200);
});

export default router;


