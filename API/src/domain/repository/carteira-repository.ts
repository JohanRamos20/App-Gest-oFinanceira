import { Carteira } from "../entities/carteira";

export interface CarteiraRepository {
    getByUserId(usuario_id: string) : Promise<Carteira | null>;
    getWalletBalance(usuario_id: string) : Promise<number>;
    createWallet(props: Carteira) : Promise<Carteira>;
}