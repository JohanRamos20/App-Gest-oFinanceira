import { Carteira } from "../../../domain/entities/carteira";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";

export interface UserWallet {
    id_usuario: string;
    saldo_cache: number;
}

class UserWalletUseCase {
    constructor(private usuarioRepository: UsuarioRepository) {}

    async getUserWallet(id_usuario: string) : Promise<Carteira> {
        const carteira = await this.usuarioRepository.findWallet(id_usuario);
        if(!carteira) {
            throw new Error("Carteira não encontrada para o usuário");
        }
        return carteira;
    }
}