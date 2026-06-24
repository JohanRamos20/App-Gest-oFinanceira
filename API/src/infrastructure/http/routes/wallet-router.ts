import { Router } from 'express'
import { makeWalletFactory } from '../factories/wallet-factory'
import { authMiddleware } from '../middleware/auth-middleware'

const walletRoutes = Router()
const walletController = makeWalletFactory()

walletRoutes.use(authMiddleware())

walletRoutes.get('/usuarios/me/wallet', walletController.findUserWallet.bind(walletController))
walletRoutes.get('/usuarios/me/wallet/saldo', walletController.getSaldoCache.bind(walletController))

export { walletRoutes }
