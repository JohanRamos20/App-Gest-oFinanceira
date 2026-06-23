import { PrismaClient} from '@prisma/client'
import { prisma } from "./prisma"
import { PrismaUnitOfWork } from './prisma-unit-of-work';
import { ITransactionManager, TransactionConfig, TransactionCallback  } from '../domain/managers/ITransactionManager'

const DEFAULT_CONFIG: Required<TransactionConfig> = {
    timeout: 30000,
    isolationLevel: "ReadCommitted"
};

export class PrismaTransactionManager implements ITransactionManager{
    constructor(
        private readonly transactionClient : PrismaClient = prisma,
        private readonly config : TransactionConfig = DEFAULT_CONFIG
    ) {}

    async execute<T>(
        action : TransactionCallback<T>,
        config? : TransactionConfig
    ) : Promise<T>{
        return this.transactionClient.$transaction(
            async (tx) => {
                const unitOfWork = new PrismaUnitOfWork(tx)
                return action(unitOfWork);
            },
            {
                ...this.config,
                ...config,
            }
        )
    }

}

