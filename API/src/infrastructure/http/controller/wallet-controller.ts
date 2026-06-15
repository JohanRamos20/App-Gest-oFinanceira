import {NextFunction, Request, Response} from "express";
import { GetSaldoCacheUseCase } from "../../../application/use-cases/carteira/getSaldoCache";
import { FindWalletUseCase } from "../../../application/use-cases/carteira/userWallet";
import { userIdSchema } from "../validators/user-validator"

export interface WalletUseCases {
    getSaldoCache : GetSaldoCacheUseCase
    findUserWallet : FindWalletUseCase
}

export class WalletController {
    constructor(private readonly walletUseCases : WalletUseCases) {}

    async getSaldoCache(req: Request, res: Response, next : NextFunction) : Promise<void> {
        try {
            const { id_usuario } = userIdSchema.parse(req.params)          
            const saldo_cache = await this.walletUseCases.getSaldoCache.getSaldoCache({id_usuario})
            res.status(200).json(saldo_cache)
        }
        catch (error) {
            next(error)
        }
    }

    async findUserWallet(req: Request, res: Response, next: NextFunction) : Promise <void> {
        try {
            const { id_usuario } = userIdSchema.parse(req.params)
            const wallet = await this.walletUseCases.findUserWallet.getUserWallet({id_usuario})
            res.status(200).json(wallet)
        }
        catch(error){
            next(error)
        }
    }

}