import { describe, it, expect, beforeEach } from 'vitest'
import { FakeTransacaoRepository } from '../../../fakes/fake-transacao-repository'
import { FakeCarteiraRepository } from '../../../fakes/fake-wallet-repository'
import { FindTransacaoTypesUseCase } from '../../../../src/application/use-cases/transacao/findTransacaoTypes'
import { Carteira } from '../../../../src/domain/entities/carteira'
import { Transacao, Categorias, TipoTransacao } from '../../../../src/domain/entities/transacao'

describe('FindTransacaoTypesUseCase', () => {
    let transacaoRepository: FakeTransacaoRepository
    let carteiraRepository: FakeCarteiraRepository
    let useCase: FindTransacaoTypesUseCase

    beforeEach(() => {
        transacaoRepository = new FakeTransacaoRepository()
        carteiraRepository = new FakeCarteiraRepository()
        useCase = new FindTransacaoTypesUseCase(transacaoRepository, carteiraRepository)
    })

    it('Deve retornar transações filtradas por tipo', async () => {
        const carteira = Carteira.create({ id_usuario: 'id_usuario123' })
        await carteiraRepository.createWallet(carteira)

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Salário',
            id_carteira: carteira.id,
            valor: 5000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Aluguel',
            id_carteira: carteira.id,
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        }))

        const result = await useCase.find({
            id_usuario: 'id_usuario123',
            filtro: { tipo_transacao: TipoTransacao.CREDITO }
        })

        expect(result).toHaveLength(1)
        expect(result[0].nome).toBe('Salário')
        expect(result[0].tipo_transacao).toBe(TipoTransacao.CREDITO)
    })

    it('Deve retornar transações filtradas por categoria', async () => {
        const carteira = Carteira.create({ id_usuario: 'id_usuario123' })
        await carteiraRepository.createWallet(carteira)

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Salário',
            id_carteira: carteira.id,
            valor: 5000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Aluguel',
            id_carteira: carteira.id,
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        }))

        const result = await useCase.find({
            id_usuario: 'id_usuario123',
            filtro: { categoria: Categorias.DESPESAS }
        })

        expect(result).toHaveLength(1)
        expect(result[0].nome).toBe('Aluguel')
        expect(result[0].categoria).toBe(Categorias.DESPESAS)
    })

    it('Deve retornar transações filtradas por tipo e categoria', async () => {
        const carteira = Carteira.create({ id_usuario: 'id_usuario123' })
        await carteiraRepository.createWallet(carteira)

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Salário',
            id_carteira: carteira.id,
            valor: 5000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Freelance',
            id_carteira: carteira.id,
            valor: 2000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Aluguel',
            id_carteira: carteira.id,
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        }))

        const result = await useCase.find({
            id_usuario: 'id_usuario123',
            filtro: { tipo_transacao: TipoTransacao.CREDITO, categoria: Categorias.DESPESAS }
        })

        expect(result).toHaveLength(2)
        expect(result[0].nome).toBe('Salário')
        expect(result[1].nome).toBe('Freelance')
    })

    it('Deve retornar lista vazia se nenhuma transação bater com o filtro', async () => {
        const carteira = Carteira.create({ id_usuario: 'id_usuario123' })
        await carteiraRepository.createWallet(carteira)

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Aluguel',
            id_carteira: carteira.id,
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        }))

        const result = await useCase.find({
            id_usuario: 'id_usuario123',
            filtro: { tipo_transacao: TipoTransacao.CREDITO }
        })

        expect(result).toHaveLength(0)
    })

    it('Deve retornar apenas transações da carteira correta', async () => {
        const carteira1 = Carteira.create({ id_usuario: 'id_usuario1' })
        const carteira2 = Carteira.create({ id_usuario: 'id_usuario2' })
        await carteiraRepository.createWallet(carteira1)
        await carteiraRepository.createWallet(carteira2)

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Salário usuario1',
            id_carteira: carteira1.id,
            valor: 5000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        await transacaoRepository.createTransacao(Transacao.create({
            nome: 'Salário usuario2',
            id_carteira: carteira2.id,
            valor: 3000,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.CREDITO
        }))

        const result = await useCase.find({
            id_usuario: 'id_usuario1',
            filtro: { tipo_transacao: TipoTransacao.CREDITO }
        })

        expect(result).toHaveLength(1)
        expect(result[0].nome).toBe('Salário usuario1')
    })

    it('Deve lançar BusinessError se a carteira não for encontrada', async () => {
        await expect(
            useCase.find({
                id_usuario: 'id_inexistente',
                filtro: { tipo_transacao: TipoTransacao.CREDITO }
            })
        ).rejects.toMatchObject({
            message: 'Carteira não encontrada',
            statusCode: 404
        })
    })
})