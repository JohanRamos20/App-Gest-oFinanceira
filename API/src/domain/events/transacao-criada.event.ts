import { Categorias, TipoTransacao } from "../entities/transacao";
import { Event } from "./domain-event";

export class TransacaoCriadaEvent implements Event {
    
    static readonly eventName = "CreatedTransaction"

    readonly nome =  TransacaoCriadaEvent.eventName
    readonly ocorreuEm = new Date();

    constructor(
        public readonly id_usuario: string,
        public readonly id_transacao: string,
        public readonly id_carteira: string,
        public readonly valor: number,
        public readonly nome_transacao: string,
        public readonly categoria: Categorias,
        public readonly tipo_transacao: TipoTransacao,
    ) {}

}