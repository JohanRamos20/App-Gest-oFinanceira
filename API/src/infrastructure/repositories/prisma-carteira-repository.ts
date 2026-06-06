import {Carteira} from "../../domain/entities/carteira";
import {Carteira as PrismaCarteira} from "@prisma/client";
import {CarteiraRepository} from "../../domain/repositories/carteira-repository";
import {prisma} from "../../database/prisma";

export class PrismaCarteiraRepository implements CarteiraRepository {
    constructor(private Prisma: typeof prisma) {}

    async getByUserId(id_usuario: string): Promise<Carteira | null> {
        const carteira = await this.Prisma.carteira.findUnique({
            where: { id_usuario },
        }); 
        return carteira ? this.toDomain(carteira) : null;
    }

    async setCacheWalletBalance(id_carteira: string, novoSaldo: number): Promise<void> {
        await this.Prisma.carteira.update({
            where: { id: id_carteira },
            data: { saldo_cache: novoSaldo},
        });
    }

    async createWallet(props: Carteira): Promise<Carteira> {
        const criada = await this.Prisma.carteira.create({
            data: {
                id: props.id,
                id_usuario: props.id_usuario,
                saldo_cache: props.saldo_cache
            },
        });
        return this.toDomain(criada);
    }

    private toDomain(carteira: PrismaCarteira): Carteira {
        return Carteira.createFromPrimitives({
            id: carteira.id,
            id_usuario: carteira.id_usuario,
            saldo_cache: Number(carteira.saldo_cache),
        });
    }
}