import { describe, it, expect, beforeEach } from "vitest";
import { UpdateMetaUseCase } from "../../../../src/application/use-cases/metas/updateMeta"
import { FakeMetasRepository } from "../../../fakes/fake-meta-repository";
import { Meta } from "../../../../src/domain/entities/meta";
describe("UpdateMetaUseCase", () =>{
    let metaRepository : FakeMetasRepository
    let useCase : UpdateMetaUseCase

    beforeEach(() => {
        metaRepository = new FakeMetasRepository()
        useCase = new UpdateMetaUseCase(metaRepository)
    })

    it("Deve atualizar os valores de uma meta", async () =>{
        const meta = Meta.create({
                    id_usuario: 'id_usuario123',
                    nome: 'Viagem',
                    valor_total: 5000,
                })
        await metaRepository.createMeta(meta)

        await useCase.update({id_meta : meta.id, valor : 300})

        const metaAtualizada = await metaRepository.findMetaByID(meta.id)

        expect(metaAtualizada?.valor_guardado).toBe(300)

    })

    it("Deve atualizar uma meta várias vezes", async () =>{
        const meta = Meta.create({
                    id_usuario: 'id_usuario123',
                    nome: 'Viagem',
                    valor_total: 5000,
                })
        await metaRepository.createMeta(meta)

        await useCase.update({id_meta : meta.id, valor : 300})

        await useCase.update({id_meta : meta.id, valor : 500})

        const metaAtualizada = await metaRepository.findMetaByID(meta.id)

        expect(metaAtualizada?.valor_guardado).toBe(800)

    })

    it("Deve retornar true se o valor for completado", async () =>{
        const meta = Meta.create({
                    id_usuario: 'id_usuario123',
                    nome: 'Viagem',
                    valor_total: 5000,
                })
        await metaRepository.createMeta(meta)

        const result = await useCase.update({id_meta : meta.id, valor : 5000})

        expect(result.metaAtingida).toBe(true)
    })

    it("Deve retornar o valor restante de uma meta", async () =>{
        const meta = Meta.create({
                    id_usuario: 'id_usuario123',
                    nome: 'Viagem',
                    valor_total: 5000,
                })
        await metaRepository.createMeta(meta)

        const result = await useCase.update({id_meta : meta.id, valor : 3000})

        expect(result.valorRestante).toBe(2000)
    })

    it("Deve lançar businessError se a meta não for encontrada", async () =>{
        await expect(
            useCase.update({id_meta : "id_inválido", valor : 300})
        ).rejects.toMatchObject({
            message: "Meta não encontrada",
            statusCode : 404
        })
    })
})