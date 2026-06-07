import { Router } from 'express';
import { makeUsuarioController } from '../factories/usuario-factory';
import { authMiddleware } from '../middleware/auth-middleware';

const usuarioRoutes = Router()
const usuarioController = makeUsuarioController()

usuarioRoutes.post('/create', usuarioController.createUser.bind(usuarioController))
usuarioRoutes.post('/login', usuarioController.loginUser.bind(usuarioController))

usuarioRoutes.use(authMiddleware())

usuarioRoutes.patch('/usuarios/:id_usuario/senha', usuarioController.updatePassword.bind(usuarioController))
usuarioRoutes.get('/usuarios/:id_usuario/wallet', usuarioController.userWallet.bind(usuarioController))

export { usuarioRoutes };