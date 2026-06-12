import { TipoTransacao, Transacao, Categorias } from "../entities/transacao";

export interface FiltroTransacao {
    categoria?: Categorias;
    tipo_transacao?: TipoTransacao;
}

export interface TransacaoRepository {
    createTransacao(data: Transacao) : Promise<Transacao>;
    getTransacoesByFiltro(id_carteira: string, filtro: FiltroTransacao) : Promise<Transacao[]>;
}


