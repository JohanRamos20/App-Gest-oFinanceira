import { BusinessError } from "../../../domain/errors/business-error";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";

export interface GetSaldoCacheRequest {
    id_usuario : string
}

export class GetSaldoCacheUseCase {
    constructor(private carteiraRepository : CarteiraRepository) {}

    async getSaldoCache(req : GetSaldoCacheRequest) : Promise<number> {

        const carteira = await this.carteiraRepository.getByUserId(req.id_usuario);

        if(!carteira){
            throw new BusinessError("Carteira não encontrada", 404)
        }

        let saldo = await this.carteiraRepository.getCacheWalletBalance(carteira.id)

        if(saldo === null){
            console.log("iniciar rotina de armazenar na cache")
            saldo = await this.carteiraRepository.getSaldoByCarteira(carteira.id)
            await this.carteiraRepository.setCacheWalletBalance(carteira.id, saldo)
        }

        return saldo

    }

}