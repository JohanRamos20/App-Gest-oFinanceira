import { describe, it, expect, beforeEach } from 'vitest'
import { FakeMetasRepository } from '../../../fakes/fake-meta-repository'
import { DeleteMetaUseCase } from '../../../../src/application/use-cases/metas/deleteMeta'
import { Meta } from '../../../../src/domain/entities/meta'

describe('DeleteMetaUseCase', () => {
    let metasRepository: FakeMetasRepository
    let useCase: DeleteMetaUseCase

    beforeEach(() => {
        metasRepository = new FakeMetasRepository()
        useCase = new DeleteMetaUseCase(metasRepository)
    })

    it('Deve deletar uma meta existente', async () => {
        const meta = Meta.create({
            id_usuario: 'id_usuario123',
            nome: 'Viagem',
            valor_total: 5000,
        })

        await metasRepository.createMeta(meta)

        await useCase.delete({ id_meta: meta.id })

        const metas = metasRepository.getAll()
        expect(metas).toHaveLength(0)
    })

    it('Deve lançar BusinessError se a meta não for encontrada', async () => {
        await expect(
            useCase.delete({ id_meta: 'id_inexistente' })
        ).rejects.toMatchObject({
            message: 'Meta não encontrada',
            statusCode: 404
        })
    })

    it('Deve deletar apenas a meta correta quando existem várias', async () => {
        const meta1 = Meta.create({
            id_usuario: 'id_usuario123',
            nome: 'Viagem',
            valor_total: 5000,
        })

        const meta2 = Meta.create({
            id_usuario: 'id_usuario123',
            nome: 'Carro',
            valor_total: 30000,
        })

        await metasRepository.createMeta(meta1)
        await metasRepository.createMeta(meta2)

        await useCase.delete({ id_meta: meta1.id })

        const metas = metasRepository.getAll()
        expect(metas).toHaveLength(1)
        expect(metas[0].id).toBe(meta2.id)
    })
})