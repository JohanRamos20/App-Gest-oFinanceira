import { PrismaTransacaoRepository } from "../../repositories/prisma-transacao-repository";
import { PrismaCarteiraRepository } from "../../repositories/prisma-carteira-repository";
import { TransacaoController } from "../controller/transacao-controller";
import { CreateTransacaoUseCase } from "../../../application/use-cases/transacao/createTransacao";
import { prisma } from "../../../database/prisma";


export function makeTransacaoController(): TransacaoController {
    const transacaoRepository = new PrismaTransacaoRepository(prisma);
    const carteiraRepository = new PrismaCarteiraRepository(prisma);

    return new TransacaoController({
        createTransacao: new CreateTransacaoUseCase(transacaoRepository, carteiraRepository)
    });
}