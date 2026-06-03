import { Carteira } from "../../../domain/entities/carteira";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";

export interface UserWalletRequest {
    id_usuario: string;
}

export class UserWalletUseCase {
    constructor(private usuarioRepository: UsuarioRepository) {}

    async getUserWallet(req: UserWalletRequest) : Promise<Carteira> {
        const carteira = await this.usuarioRepository.findWallet(req.id_usuario);
        if(!carteira) {
            throw new Error("Carteira não encontrada para o usuário");
        }
        return carteira;
    }
}