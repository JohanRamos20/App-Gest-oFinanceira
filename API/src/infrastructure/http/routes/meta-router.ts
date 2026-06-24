import { Router } from 'express';
import { makeMetaController } from '../factories/meta-factory';
import { authMiddleware } from '../middleware/auth-middleware';

const metaRoutes = Router()
const metaController = makeMetaController()
metaRoutes.use(authMiddleware())
metaRoutes.post('/usuarios/me/metas',  metaController.createMeta.bind(metaController))
metaRoutes.patch('/usuarios/me/metas/:id_meta', metaController.updateMeta.bind(metaController))
metaRoutes.delete('/usuarios/me/metas/:id_meta', metaController.deleteMeta.bind(metaController))
metaRoutes.get('/usuarios/me/metas', metaController.findAllMetas.bind(metaController))

export { metaRoutes };
