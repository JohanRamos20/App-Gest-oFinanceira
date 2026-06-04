import { Router } from "express";
import { makeTransacaoController } from "../factories/transacao-factory";

const transacaoRoutes = Router();
const transacaoController = makeTransacaoController();

transacaoRoutes.post('/transacoes', (req, res) => transacaoController.createTransacao(req, res));

export { transacaoRoutes };