import { PrismaLogAuditoriaRepository } from "../../repositories/prisma-log-auditoria-repository";
import { PrismaCarteiraRepository } from "../../repositories/prisma-carteira-repository";
import { listenerAtualizarSaldoCache } from "../../../application/listeners/atualizar-cache-saldo.listener";
import { listenerCreateLogAuditoria } from "../../../application/listeners/create-log-transacao-auditoria.listener"
import { prisma } from "../../../database/prisma";

export function makeListeners() {
    const carteiraRepository = new PrismaCarteiraRepository(prisma)
    const logRepository = new PrismaLogAuditoriaRepository(prisma);
    listenerAtualizarSaldoCache(carteiraRepository)
    listenerCreateLogAuditoria(logRepository);
}