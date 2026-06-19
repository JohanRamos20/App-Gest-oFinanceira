import { FakeCarteiraRepository } from "../../../fakes/fake-wallet-repository";
import { FakeUsuarioRepository } from "../../../fakes/fake-usuario-repository";
import { Carteira } from "../../../../src/domain/entities/carteira";
import { FindWalletUseCase } from "../../../../src/application/use-cases/carteira/userWallet"
import { describe, it, expect, beforeEach } from "vitest";

describe("FindWalletUseCase", () => {
    let carteiraRepository : FakeCarteiraRepository
    let usuarioRepository : FakeUsuarioRepository
    let useCase : FindWalletUseCase

    beforeEach(() => {
        carteiraRepository = new FakeCarteiraRepository
        usuarioRepository = new FakeUsuarioRepository

        useCase = new FindWalletUseCase(
            carteiraRepository
        )
    })

    it("Deve encontrar a carteira de um usuário", async () => {
        const id_usuario = "id_usuario123"

        const carteira = Carteira.create({
            id_usuario
        })

        await carteiraRepository.createWallet(carteira)

        const result = await useCase.getUserWallet({id_usuario : id_usuario})

        expect(result.id_usuario).toBe(id_usuario)

    })

    it("Deve lançar um businessError se a carteira não for encontrado", async () =>{
        const id_usuario = "id_usuario123"
        const id_usuarioIncorreto = "incorreto"

        const carteira = Carteira.create({
            id_usuario
        })

        await carteiraRepository.createWallet(carteira)

        await expect(useCase.getUserWallet({id_usuario : id_usuarioIncorreto})).rejects.toMatchObject({
            message: "Carteira não encontrada para o usuário",
            statusCode: 404
        })
    })
})