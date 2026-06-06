import { Router } from "express";
import { makeTransacaoController } from "../factories/transacao-factory";
import { authMiddleware } from '../middleware/auth-middleware';

const transacaoRoutes = Router();
const transacaoController = makeTransacaoController();

transacaoRoutes.post('/usuarios/:id_usuario/transacoes',authMiddleware(), (req, res) => transacaoController.createTransacao(req, res));
transacaoRoutes.get('/usuarios/:id_usuario/transacoes', authMiddleware() , (req, res) => transacaoController.findTransacaoTypes(req, res));

export { transacaoRoutes };