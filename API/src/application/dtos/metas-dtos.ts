import { Meta } from "../../domain/entities/meta";

export interface MetaDto {
    nome: string;
    descricao: string;
    valor_total: number;
    valor_guardado: number;
    criado_em: Date;
}

export function toMetaDto(meta: Meta): MetaDto {
    return {
        nome: meta.nome,
        descricao: meta.descricao,
        valor_total: meta.valor_total,
        valor_guardado: meta.valor_guardado,
        criado_em: meta.criado_em
    }
}