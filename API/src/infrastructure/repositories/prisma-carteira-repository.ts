import {Carteira} from "../../domain/entities/carteira";
import {Carteira as PrismaCarteira} from "@prisma/client";
import {CarteiraRepository} from "../../domain/repositories/carteira-repository";
import {prisma} from "../../database/prisma";
import { redisClient } from "../cache/redis-client";
import { TipoTransacao } from "../../domain/entities/transacao";

const CACHE_KEY = (id: string) => `carteira:saldo:${id}`;
const TTL_SEGUNDOS = 3600;

export class PrismaCarteiraRepository implements CarteiraRepository {
    constructor(private Prisma: typeof prisma) {}

    async getByUserId(id_usuario: string): Promise<Carteira | null> {
        const carteira = await this.Prisma.carteira.findUnique({
            where: { id_usuario },
        }); 
        return carteira ? this.toDomain(carteira) : null;
    }

    async getSaldoByCarteira(id_carteira: string): Promise<number> {

        const resultado = await this.Prisma.transacao.groupBy({
            by: ["tipo_transacao"],
            where: { carteira_id : id_carteira },
            _sum:{valor:true}
        })

        let saldo = 0

        for (const groups of resultado){
            const total = Number(groups._sum.valor ?? 0);
            saldo += groups.tipo_transacao === TipoTransacao.CREDITO ? total : - total;
        }

        return saldo

    }
    
    async getAllIds(): Promise<string[]> {
        const carteiras = await this.Prisma.carteira.findMany({
            select : {id : true}
        })

        return carteiras.map((c) => c.id)
    }

    async getCacheWalletBalance(id_carteira: string,): Promise<number | null> {
        const valor = await redisClient.get(CACHE_KEY(id_carteira))
        return valor !== null ? parseFloat(valor) : null
    }

    async incrementCacheWalletBalance(id_carteira: string, delta: number): Promise<void> {
        const chave = CACHE_KEY(id_carteira)
        const existe = await redisClient.exists(chave)
        
        if(!existe){
            const saldoAtual = await this.getSaldoByCarteira(id_carteira);
            await redisClient.set(chave, saldoAtual.toString(), {EX: TTL_SEGUNDOS})
            return
        }

        await redisClient.incrByFloat(chave, delta)
    }

    async setCacheWalletBalance(id_carteira: string, novoSaldo: number): Promise<void> {
        await redisClient.set(CACHE_KEY(id_carteira), novoSaldo.toString(), {EX: TTL_SEGUNDOS})  
    }

    async createWallet(props: Carteira): Promise<Carteira> {
        const criada = await this.Prisma.carteira.create({
            data: {
                id: props.id,
                id_usuario: props.id_usuario,
            },
        });
        return this.toDomain(criada);
    }

    private toDomain(carteira: PrismaCarteira): Carteira {
        return Carteira.createFromPrimitives({
            id: carteira.id,
            id_usuario: carteira.id_usuario,
        });
    }
}