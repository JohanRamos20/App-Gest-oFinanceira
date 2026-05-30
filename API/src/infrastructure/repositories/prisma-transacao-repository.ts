import type { prisma} from "../../database/prisma";
import { TransacaoRepository, FiltroTransacao } from "../../domain/repository/transacao-repository";
import { Transacao, Categorias, TipoTransacao } from "../../domain/entities/transacao";
import { Decimal } from "@prisma/client/runtime/client";
export class PrismaTransacaoRepository implements TransacaoRepository {
    constructor(private Prisma: typeof prisma) {}

    async createTransacao(transacao: Transacao): Promise<Transacao> {
        const criada = await this.Prisma.transacao.create({
            data: {
                id: transacao.id,
                nome: transacao.nome,
                carteira_id: transacao.id_carteira,
                valor: transacao.valor,
                categoria: transacao.categoria,
                tipo_transacao: transacao.tipo_transacao,
                criado_em: transacao.criado_em,
            },
        });

        return this.toDomain(criada);
    }

    async getAllTransacaoByCarteira(carteira_id: string): Promise<Transacao[]> {
        const transacoes = await this.Prisma.transacao.findMany({
            where: { carteira_id },
            orderBy: { criado_em: "desc" },
        });
        return transacoes.map((t) => this.toDomain(t));
    }

    async getTransacoesByFiltro(carteira_id: string, filtro: FiltroTransacao): Promise<Transacao[]> {
        const transacoes = await this.Prisma.transacao.findMany({
            where: {
                carteira_id: carteira_id,
                categoria: filtro.categoria,
                tipo_transacao: filtro.tipoTransacao,
            },
            orderBy: {
                criado_em: "desc",
            },
        });
        return transacoes.map((t) => this.toDomain(t));
    }

    private toDomain(transacao: {
        id: string;
        nome: string;
        carteira_id: string;
        valor: Decimal;
        categoria: string;
        tipo_transacao: string;
        criado_em: Date;
    }): Transacao {
        return Transacao.createFromPrimitives({
            id: transacao.id,
            nome: transacao.nome,
            id_carteira: transacao.carteira_id,
            valor: Number(transacao.valor),
            categoria: transacao.categoria,
            tipo_transacao: transacao.tipo_transacao,
            criado_em: transacao.criado_em,
        });
    }

}
