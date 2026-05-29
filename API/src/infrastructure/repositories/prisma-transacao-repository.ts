import type { prisma} from "../../database/prisma";
import { TransacaoRepository, FiltroTransacao } from "../../domain/repository/transacao-repository";
import { Transacao, Categorias, TipoTransacao } from "../../domain/entities/transacao";
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

        return new Transacao({
            id: criada.id,
            nome: criada.nome,
            id_carteira: criada.carteira_id,
            valor: Number(criada.valor),
            categoria: criada.categoria,
            tipo_transacao: criada.tipo_transacao,
            criado_em: criada.criado_em,
        });
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
        return transacoes.map((t) => new Transacao({
            id: t.id,
            nome: t.nome,
            id_carteira: t.carteira_id,
            valor: Number(t.valor),
            categoria: t.categoria,
            tipo_transacao: t.tipo_transacao,
            criado_em: t.criado_em,
        }));
    }

}
