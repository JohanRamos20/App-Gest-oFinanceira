import { Router } from 'express';
import { makeUsuarioController } from '../factories/usuario-factory';
import { authMiddleware } from '../middleware/auth-middleware';

const usuarioRoutes = Router()
const usuarioController = makeUsuarioController()

usuarioRoutes.post('/create', (req, res) => usuarioController.createUser(req, res));
usuarioRoutes.post('/login', (req, res) => usuarioController.loginUser(req, res));
usuarioRoutes.patch('/usuarios/:id_usuario/senha', authMiddleware() ,  (req, res) => usuarioController.updatePassword(req, res));
usuarioRoutes.get('/usuarios/:id_usuario/wallet', authMiddleware() , (req, res) => usuarioController.userWallet(req, res));

export { usuarioRoutes };