import { Carteira } from "../../../domain/entities/carteira";
import { BusinessError } from "../../../domain/errors/business-error";
import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";

export interface UserWalletRequest {
    id_usuario: string;
}

export class UserWalletUseCase {
    constructor(private usuarioRepository: UsuarioRepository) {}

    async getUserWallet(req: UserWalletRequest) : Promise<Carteira> {
        const carteira = await this.usuarioRepository.findWallet(req.id_usuario);
        if(!carteira) {
            throw new BusinessError("Carteira não encontrada para o usuário", 404);
        }
        return carteira;
    }
}