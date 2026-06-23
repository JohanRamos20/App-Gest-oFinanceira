import { CarteiraRepository } from "../repositories/carteira-repository";
import { UsuarioRepository } from "../repositories/usuario-repository";

export interface UnitOfWork {
    usuarioRepository : UsuarioRepository
    carteiraRepository : CarteiraRepository
}

export type TransactionCallback<T> = (
    uow : UnitOfWork
) => Promise <T>

export type TransactionIsolationLevel =
    | 'ReadUncommitted'
    | 'ReadCommitted'
    | 'RepeatableRead'
    | 'Serializable'

export interface Config {
    timeout? : number;
    isolationLevel?: TransactionIsolationLevel
}

export interface ITransactionManager{
    execute<T>(
        action: TransactionCallback<T>,
        config?: Config
    ) : Promise<T>
}

export type TransactionConfig = Config