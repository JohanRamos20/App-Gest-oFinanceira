import { Router } from "express";
import { makeTransacaoController } from "../factories/transacao-factory";
import { authMiddleware } from '../middleware/auth-middleware';

const transacaoRoutes = Router();
const transacaoController = makeTransacaoController();

transacaoRoutes.use(authMiddleware())

transacaoRoutes.post('/usuarios/:id_usuario/transacoes', transacaoController.createTransacao.bind(transacaoController))
transacaoRoutes.get('/usuarios/:id_usuario/transacoes', transacaoController.findTransacaoTypes.bind(transacaoController))
export { transacaoRoutes };
