import { Carteira } from "../entities/carteira";

export interface CarteiraRepository {
    getByUserId(id_usuario: string) : Promise<Carteira | null>;
    getAllIds() : Promise<string[]>
    getSaldoByCarteira(id_carteira: string) : Promise<number>;
    incrementCacheWalletBalance(id_carteira: string, delta: number) : Promise<void>
    setCacheWalletBalance(id_carteira: string, novoSaldo: number) : Promise<void>;
    getCacheWalletBalance(id_carteira: string) : Promise<number | null>
    createWallet(props: Carteira) : Promise<Carteira>;
}