import { Router } from 'express';
import { makeMetaController } from '../factories/meta-factory';

const metaRoutes = Router()
const metaController = makeMetaController()

metaRoutes.post('/meta', (req, res) => metaController.createMeta(req, res));
metaRoutes.patch('/meta', (req, res) => metaController.updateMeta(req, res));
metaRoutes.delete('/meta', (req, res) => metaController.deleteMeta(req, res));
metaRoutes.get('/meta/:id_usuario', (req, res) => metaController.findAllMetas(req, res));

export { metaRoutes };