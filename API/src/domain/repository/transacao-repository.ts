import { TipoTransacao, Transacao, Categoria } from "../entities/transacao";

export interface FiltroTransacao {
    categoria?: Categoria;
    tipoTransacao?: TipoTransacao;
}

export interface TransacaoRepository {
    createTransacao(data: Transacao) : Promise<Transacao>;
    getAllTransacoesByCarteiraId(id_carteira: string) : Promise<Transacao[]>;
    getTransacoesByFiltro(id_carteira: string, filtro: FiltroTransacao) : Promise<Transacao[]>;
}

