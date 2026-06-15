import { Carteira } from "../../../domain/entities/carteira";
import { BusinessError } from "../../../domain/errors/business-error";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";

export interface FindWalletRequest {
    id_usuario: string;
}

export class FindWalletUseCase {
    constructor(private carteiraRepository: CarteiraRepository) {}

    async getUserWallet(req: FindWalletRequest) : Promise<Carteira> {
        const carteira = await this.carteiraRepository.getByUserId(req.id_usuario);
        if(!carteira) {
            throw new BusinessError("Carteira não encontrada para o usuário", 404);
        }
        return carteira;
    }
}