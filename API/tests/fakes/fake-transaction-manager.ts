import { Config, ITransactionManager, TransactionCallback, UnitOfWork } from "../../src/domain/managers/ITransactionManager"

export class FakeTransactionManager implements ITransactionManager {
    constructor(private readonly uow : UnitOfWork) {}

    async execute<T>(action: TransactionCallback<T>, config?: Config): Promise<T> {
        return action(this.uow)
    }
}