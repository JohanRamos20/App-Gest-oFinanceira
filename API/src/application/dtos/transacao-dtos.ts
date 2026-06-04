import { Transacao } from "../../domain/entities/transacao";

export interface TransacaoDto {
    nome: string;
    valor: number;
    categoria: string;
    tipo_transacao: string;
    criado_em: Date;
}

export function toTransacaoDto(transacao: Transacao): TransacaoDto {
    return {
        nome: transacao.nome,
        valor: transacao.valor,
        categoria: transacao.categoria,
        tipo_transacao: transacao.tipo_transacao,
        criado_em: transacao.criado_em,
    };
}