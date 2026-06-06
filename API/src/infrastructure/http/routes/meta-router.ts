import { Router } from 'express';
import { makeMetaController } from '../factories/meta-factory';
import { authMiddleware } from '../middleware/auth-middleware';

const metaRoutes = Router()
const metaController = makeMetaController()

metaRoutes.post('/usuarios/:id/metas', authMiddleware(), (req, res) => metaController.createMeta(req, res));
metaRoutes.patch('/usuarios/metas/:id_meta', authMiddleware(), (req, res) => metaController.updateMeta(req, res));
metaRoutes.delete('/usuarios/metas/:id_meta', authMiddleware(), (req, res) => metaController.deleteMeta(req, res));
metaRoutes.get('/usuarios/:id_usuario/metas', authMiddleware(), (req, res) => metaController.findAllMetas(req, res));

export { metaRoutes };