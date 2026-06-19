import { describe, it, expect, beforeEach } from "vitest";
import { FakeMetasRepository } from "../../../fakes/fake-meta-repository";
import { FakeUsuarioRepository } from "../../../fakes/fake-usuario-repository";
import { CreateMetaUseCase } from "../../../../src/application/use-cases/metas/createMeta"
import { Usuario } from "../../../../src/domain/entities/usuario";

describe("CreateMetaUseCase", () => {
    let metasRepository : FakeMetasRepository
    let usuarioRepository : FakeUsuarioRepository
    let useCase : CreateMetaUseCase

    beforeEach(() =>{
        metasRepository = new FakeMetasRepository()
        usuarioRepository = new FakeUsuarioRepository()

        useCase = new CreateMetaUseCase(metasRepository, usuarioRepository)
    })

    it("Deve ser capaz de criar uma meta", async() => {
        const usuario = Usuario.create({
            id: "id_usuario123",
            nome: "Carlos Silva",
            email: "carlos@email.com",
            senha_hash: "hash",
        });

        await usuarioRepository.create(usuario);


        await useCase.create({
            id_usuario: "id_usuario123",
            nome: "Viagem",
            descricao: "Viagem de férias",
            valor_total: 200,
        })

        const metas = await metasRepository.getAllMetasByUser("id_usuario123")

        expect(metas).toHaveLength(1);
        expect(metas[0]).toMatchObject({
            id_usuario: usuario.id,
            nome: "Viagem",
            descricao: "Viagem de férias",
            valor_total: 200,
            valor_guardado: 0,
        });

        expect(metas[0].id).toEqual(expect.any(String));
        expect(metas[0].criado_em).toBeInstanceOf(Date);
    })

    it("Não deve criar uma meta para um usuario inexistente", async() => {
        await expect(
            useCase.create({
                id_usuario: "inexistente",
                nome: "Viagem",
                valor_total: 200,
            })
        ).rejects.toMatchObject({
            message: "Usuário não encontrado",
            statusCode: 404,
        });

        expect(
            await metasRepository.getAllMetasByUser("inexistente")
        ).toHaveLength(0)

    })
})
