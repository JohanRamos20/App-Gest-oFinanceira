import { UnitOfWork } from "../domain/managers/ITransactionManager";
import { PrismaUsuarioRepository } from "../infrastructure/repositories/prisma-usuario-repository";
import { PrismaCarteiraRepository } from "../infrastructure/repositories/prisma-carteira-repository";
import { PrismaRepositoryClient } from "./prisma-repository-client";

export class PrismaUnitOfWork implements UnitOfWork{
    readonly usuarioRepository : PrismaUsuarioRepository;
    readonly carteiraRepository: PrismaCarteiraRepository;

    constructor(tx: PrismaRepositoryClient){
        this.usuarioRepository = new PrismaUsuarioRepository(tx)
        this.carteiraRepository = new PrismaCarteiraRepository(tx)
    }
}