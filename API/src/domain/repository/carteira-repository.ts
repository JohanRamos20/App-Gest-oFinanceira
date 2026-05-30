import { Carteira } from "../entities/carteira";

export interface CarteiraRepository {
    getByUserId(usuario_id: string) : Promise<Carteira | null>;
    setCacheWalletBalance(id_carteira: string, novoSaldo: number) : Promise<null>;
    createWallet(props: Carteira) : Promise<Carteira>;
}