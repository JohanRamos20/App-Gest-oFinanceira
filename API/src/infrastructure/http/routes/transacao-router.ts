import { Router } from "express";
import { makeTransacaoController } from "../factories/transacao-factory";
import { authMiddleware } from '../middleware/auth-middleware';

const transacaoRoutes = Router();
const transacaoController = makeTransacaoController();

transacaoRoutes.use(authMiddleware())

transacaoRoutes.post('/usuarios/me/transacoes', transacaoController.createTransacao.bind(transacaoController))
transacaoRoutes.get('/usuarios/me/transacoes', transacaoController.findTransacaoTypes.bind(transacaoController))
export { transacaoRoutes };
