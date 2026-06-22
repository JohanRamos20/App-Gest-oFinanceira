import { describe, it, expect, beforeEach } from 'vitest'
import { FakeMetasRepository } from '../../../fakes/fake-meta-repository'
import { FakeUsuarioRepository } from '../../../fakes/fake-usuario-repository'
import { FindAllMetasUseCase } from '../../../../src/application/use-cases/metas/findAllMetas'
import { Meta } from '../../../../src/domain/entities/meta'
import { Usuario } from '../../../../src/domain/entities/usuario'

describe('FindAllMetasUseCase', () => {
    let metasRepository: FakeMetasRepository
    let usuarioRepository: FakeUsuarioRepository
    let useCase: FindAllMetasUseCase

    beforeEach(() => {
        metasRepository = new FakeMetasRepository()
        usuarioRepository = new FakeUsuarioRepository()
        useCase = new FindAllMetasUseCase(metasRepository, usuarioRepository)
    })

    it('Deve retornar todas as metas de um usuário', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        })

        await usuarioRepository.create(usuario)

        await metasRepository.createMeta(Meta.create({
            id_usuario: usuario.id,
            nome: 'Viagem',
            valor_total: 5000,
        }))

        await metasRepository.createMeta(Meta.create({
            id_usuario: usuario.id,
            nome: 'Carro',
            valor_total: 30000,
        }))

        const result = await useCase.findAll({ id_usuario: usuario.id })

        expect(result).toHaveLength(2)
        expect(result[0].nome).toBe('Viagem')
        expect(result[1].nome).toBe('Carro')
    })

    it('Deve retornar apenas as metas do usuário correto', async () => {
        const usuario1 = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        })

        const usuario2 = Usuario.create({
            nome: 'João Lima',
            email: 'joao@email.com',
            senha_hash: 'hashed:5678',
        })

        await usuarioRepository.create(usuario1)
        await usuarioRepository.create(usuario2)

        await metasRepository.createMeta(Meta.create({
            id_usuario: usuario1.id,
            nome: 'Viagem',
            valor_total: 5000,
        }))

        await metasRepository.createMeta(Meta.create({
            id_usuario: usuario2.id,
            nome: 'Carro',
            valor_total: 30000,
        }))

        const result = await useCase.findAll({ id_usuario: usuario1.id })

        expect(result).toHaveLength(1)
        expect(result[0].nome).toBe('Viagem')
    })

    it('Deve retornar lista vazia se o usuário não tiver metas', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        })

        await usuarioRepository.create(usuario)

        const result = await useCase.findAll({ id_usuario: usuario.id })

        expect(result).toHaveLength(0)
    })

    it('Deve lançar BusinessError se o usuário não for encontrado', async () => {
        await expect(
            useCase.findAll({ id_usuario: 'inexistente' })
        ).rejects.toMatchObject({
            message: 'Usuário não encontrado',
            statusCode: 404
        })
    })
})