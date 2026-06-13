import { BusinessError } from "../../../domain/errors/business-error";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";

export interface getSaldoCacheRequest {
    id_usuario : string
}

export class getSaldoCacheUseCase {
    constructor(private carteiraRepository : CarteiraRepository) {}

    async getSaldoCache(req : getSaldoCacheRequest) : Promise<number> {

        let saldo = await this.carteiraRepository.getCacheWalletBalance(req.id_usuario)

        if(saldo === null){
            console.log("iniciar rotina de armazenar na cache")
            saldo = await this.carteiraRepository.getSaldoByCarteira(req.id_usuario)
            await this.carteiraRepository.setCacheWalletBalance(req.id_usuario, saldo)
        }

        return saldo

    }

}