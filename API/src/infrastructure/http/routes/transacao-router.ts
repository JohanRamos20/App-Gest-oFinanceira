import { Router } from "express";
import { makeTransacaoController } from "../factories/transacao-factory";

const transacaoRoutes = Router();
const transacaoController = makeTransacaoController();

transacaoRoutes.post('/usuarios/:id_usuario/transacoes', (req, res) => transacaoController.createTransacao(req, res));
transacaoRoutes.get('/usuarios/:id_usuario/transacoes', (req, res) => transacaoController.findTransacaoTypes(req, res));

export { transacaoRoutes };