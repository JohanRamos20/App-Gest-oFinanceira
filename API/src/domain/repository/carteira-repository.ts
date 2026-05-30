import { Carteira } from "../entities/carteira";

export interface CarteiraRepository {
    getByUserId(id_usuario: string) : Promise<Carteira | null>;
    setCacheWalletBalance(id_carteira: string, novoSaldo: number) : Promise<void>;
    createWallet(props: Carteira) : Promise<Carteira>;
}