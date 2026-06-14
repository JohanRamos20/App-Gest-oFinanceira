import { LogAuditoria } from "../../domain/repositories/log-auditoria-repository";
import { LogAuditoriaRepository } from "../../domain/repositories/log-auditoria-repository";
import { prisma } from "../../database/prisma";

export class PrismaLogAuditoriaRepository implements LogAuditoriaRepository {
    constructor( private Prisma : typeof prisma) {}

    async registrar(data: LogAuditoria): Promise<void> {
        await this.Prisma.logAuditoria.create({
            data : {
                evento : data.evento,
                id_usuario: data.id_usuario,
                id_entidade: data.id_entidade,
                dados: data.dados as object,
            }
        })
    }

}