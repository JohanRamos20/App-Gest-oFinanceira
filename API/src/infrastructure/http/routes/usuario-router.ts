import { Router } from 'express';
import { makeUsuarioController } from '../factories/usuario-factory';

const usuarioRoutes = Router()
const usuarioController = makeUsuarioController()

usuarioRoutes.post('/usuarios', (req, res) => usuarioController.createUser(req, res));
usuarioRoutes.patch('/usuarios/:id/senha', (req, res) => usuarioController.updatePassword(req, res));
usuarioRoutes.get('/usuarios/:id/wallet', (req, res) => usuarioController.userWallet(req, res));

export { usuarioRoutes };