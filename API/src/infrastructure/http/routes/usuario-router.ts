import { Router } from 'express';
import { makeUsuarioController } from '../factories/usuario-factory';

const usuarioRouter = Router()
const usuarioController = makeUsuarioController()

usuarioRouter.post('/usuarios', (req, res) => usuarioController.createUser(req, res));
usuarioRouter.patch('/usuarios/:id/senha', (req, res) => usuarioController.updatePassword(req, res));
usuarioRouter.get('/usuarios/:id/wallet', (req, res) => usuarioController.userWallet(req, res));

export { usuarioRouter };