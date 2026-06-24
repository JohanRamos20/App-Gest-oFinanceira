import { beforeEach, describe, expect, it } from "vitest";
import { DeleteMetaUseCase } from "../../../../src/application/use-cases/metas/deleteMeta";
import { Meta } from "../../../../src/domain/entities/meta";
import { FakeMetasRepository } from "../../../fakes/fake-meta-repository";

describe("DeleteMetaUseCase", () => {
    const idUsuario = "id_usuario123";
    let metasRepository: FakeMetasRepository;
    let useCase: DeleteMetaUseCase;

    beforeEach(() => {
        metasRepository = new FakeMetasRepository();
        useCase = new DeleteMetaUseCase(metasRepository);
    });

    it("Deve deletar uma meta existente", async () => {
        const meta = Meta.create({
            id_usuario: idUsuario,
            nome: "Viagem",
            valor_total: 5000,
        });
        await metasRepository.createMeta(meta);

        await useCase.delete({ id_meta: meta.id, id_usuario: idUsuario });

        expect(metasRepository.getAll()).toHaveLength(0);
    });

    it("Deve lançar BusinessError se a meta não for encontrada", async () => {
        await expect(
            useCase.delete({ id_meta: "id_inexistente", id_usuario: idUsuario })
        ).rejects.toMatchObject({
            message: "Meta não encontrada",
            statusCode: 404,
        });
    });

    it("Deve deletar apenas a meta correta quando existem várias", async () => {
        const meta1 = Meta.create({
            id_usuario: idUsuario,
            nome: "Viagem",
            valor_total: 5000,
        });
        const meta2 = Meta.create({
            id_usuario: idUsuario,
            nome: "Carro",
            valor_total: 30000,
        });
        await metasRepository.createMeta(meta1);
        await metasRepository.createMeta(meta2);

        await useCase.delete({ id_meta: meta1.id, id_usuario: idUsuario });

        const metas = metasRepository.getAll();
        expect(metas).toHaveLength(1);
        expect(metas[0].id).toBe(meta2.id);
    });

    it("Não deve deletar uma meta de outro usuário", async () => {
        const meta = Meta.create({
            id_usuario: idUsuario,
            nome: "Viagem",
            valor_total: 5000,
        });
        await metasRepository.createMeta(meta);

        await expect(
            useCase.delete({
                id_meta: meta.id,
                id_usuario: "outro_usuario",
            })
        ).rejects.toMatchObject({
            message: "Meta não encontrada",
            statusCode: 404,
        });

        expect(metasRepository.getAll()).toHaveLength(1);
    });
});
