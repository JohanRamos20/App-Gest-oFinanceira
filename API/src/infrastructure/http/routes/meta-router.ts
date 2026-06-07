import { Router } from 'express';
import { makeMetaController } from '../factories/meta-factory';
import { authMiddleware } from '../middleware/auth-middleware';

const metaRoutes = Router()
const metaController = makeMetaController()
metaRoutes.use(authMiddleware())

metaRoutes.post('/usuarios/:id/metas',  metaController.createMeta.bind(metaController))
metaRoutes.patch('/usuarios/metas/:id_meta', metaController.updateMeta.bind(metaController))
metaRoutes.delete('/usuarios/metas/:id_meta', metaController.deleteMeta.bind(metaController))
metaRoutes.get('/usuarios/:id_usuario/metas', metaController.findAllMetas.bind(metaController))

export { metaRoutes };