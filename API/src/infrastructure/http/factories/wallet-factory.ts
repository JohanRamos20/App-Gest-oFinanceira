import { PrismaCarteiraRepository } from "../../repositories/prisma-carteira-repository";
import { WalletController } from "../controller/wallet-controller";
import { FindWalletUseCase } from "../../../application/use-cases/carteira/userWallet";
import { GetSaldoCacheUseCase } from "../../../application/use-cases/carteira/getSaldoCache";
import { prisma } from "../../../database/prisma";

export function makeWalletFactory(): WalletController {

    const walletRepository = new PrismaCarteiraRepository(prisma)

    return new WalletController({
        findUserWallet : new FindWalletUseCase(walletRepository),
        getSaldoCache : new GetSaldoCacheUseCase(walletRepository)
    })

}