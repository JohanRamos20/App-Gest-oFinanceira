import { describe, it, expect, beforeEach } from 'vitest'
import { FakeCarteiraRepository } from "../../../fakes/fake-wallet-repository"
import { GetSaldoCacheUseCase } from "../../../../src/application/use-cases/carteira/getSaldoCache"
import { Carteira } from '../../../../src/domain/entities/carteira'
import { TipoTransacao } from '../../../../src/domain/entities/transacao'


describe('GetSaldoCache', () => {
    let carteiraRepository : FakeCarteiraRepository
    let useCase : GetSaldoCacheUseCase

    beforeEach(() => {
        carteiraRepository = new FakeCarteiraRepository()
        useCase = new GetSaldoCacheUseCase(carteiraRepository)
    })

    it('Deve conseguir o saldo armazenado na cache já populada', async () => {
        const id_usuario = "id_usuario123"

        const carteira = Carteira.create({
            id_usuario
        })

        await carteiraRepository.createWallet(carteira)
        await carteiraRepository.setCacheWalletBalance(carteira.id, 250)

        const saldo = await useCase.getSaldoCache({id_usuario : id_usuario})

        expect(saldo).toBe(250)
    })

    it('Deve popular a cache caso ela não exista e retornar o saldo', async () => {
        const id_usuario = "id_usuario123"

        const carteira = Carteira.create({
            id_usuario
        })

        await carteiraRepository.createWallet(carteira)
        carteiraRepository.adicionarTransacao(carteira.id, 300, TipoTransacao.CREDITO)
        carteiraRepository.adicionarTransacao(carteira.id, 200, TipoTransacao.DEBITO)

        const saldo = await useCase.getSaldoCache({id_usuario : id_usuario})
        expect(saldo).toBe(100)

        const saldoNoCache = await carteiraRepository.getCacheWalletBalance(carteira.id)
        expect(saldoNoCache).toBe(100)

    })

    it('Deve lançar BusinessError se a carteira não for encontrada', async () => {
        await expect(
            useCase.getSaldoCache({ id_usuario: "inexistente" })
        ).rejects.toMatchObject({
            message: "Carteira não encontrada",
            statusCode: 404
        })
    })

})