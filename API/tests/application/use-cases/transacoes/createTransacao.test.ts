import { describe, it, expect, beforeEach} from 'vitest'
import { Transacao, Categorias, TipoTransacao } from '../../../../src/domain/entities/transacao'
import { Carteira } from '../../../../src/domain/entities/carteira'
import { FakeTransacaoRepository } from '../../../fakes/fake-transacao-repository'
import { FakeCarteiraRepository } from '../../../fakes/fake-wallet-repository'
import { CreateTransacaoUseCase } from "../../../../src/application/use-cases/transacao/createTransacao"

describe("CreateTransacaoUseCase", () => {
    let transacaoRepository : FakeTransacaoRepository
    let carteiraRepository : FakeCarteiraRepository
    let useCase : CreateTransacaoUseCase

    beforeEach(() => {
        transacaoRepository = new FakeTransacaoRepository()
        carteiraRepository = new FakeCarteiraRepository()

        useCase = new CreateTransacaoUseCase(
            transacaoRepository,
            carteiraRepository
        )
    })

    it("Deve criar uma transacao", async () => {
        const carteira = Carteira.create({id_usuario :'id_usuario123'})
        await carteiraRepository.createWallet(carteira)

        const result = await useCase.create({
            nome: 'Aluguel',
            id_usuario: 'id_usuario123',
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        })

        expect(result.nome).toBe('Aluguel')
        expect(result.valor).toBe(1500)
        expect(result.categoria).toBe(Categorias.DESPESAS)
        expect(result.tipo_transacao).toBe(TipoTransacao.DEBITO)

    })

    it("Deve persistir uma transacao no repositório", async () => {
        const carteira = Carteira.create({id_usuario :'id_usuario123'})
        await carteiraRepository.createWallet(carteira)

        await useCase.create({
            nome: 'Aluguel',
            id_usuario: 'id_usuario123',
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        })

        const transacoes = transacaoRepository.getAll()

        expect(transacoes[0]).toMatchObject({
            id_usuario: "id_usuario123",
            nome: "Aluguel",
            valor: 1500,
            categoria : Categorias.DESPESAS,
            tipo_transacao : TipoTransacao.DEBITO
        });

    })

    it("Deve lançar businessError se a carteira não for encotrada", async () => {
        const carteira = Carteira.create({id_usuario :'id_usuario123'})
        await carteiraRepository.createWallet(carteira)

        await expect( useCase.create({
            nome: 'Aluguel',
            id_usuario: 'id_invalido',
            valor: 1500,
            categoria: Categorias.DESPESAS,
            tipo_transacao: TipoTransacao.DEBITO
        })
        ).rejects.toMatchObject({
            message: "Carteira não encontrada",
            statusCode: 404
        })
    })


})