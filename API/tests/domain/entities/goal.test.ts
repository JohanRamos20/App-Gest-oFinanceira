import { it, describe, expect } from 'vitest'
import { Meta } from '../../../src/domain/entities/meta'

describe('Meta', () => {
    const dadosValidos = {
        id_usuario : 'id_123',
        nome : 'meta123',
        valor_total : 1000,
    }
    describe('create()', () => {

        it('Deve criar uma meta valida', () => {
            const meta = Meta.create(dadosValidos)
            expect(meta.nome).toBe('meta123')
            expect(meta.id_usuario).toBe('id_123')
            expect(meta.valor_total).toBe(1000)
        })
        it('Meta deve ter um id', () => {
            const meta = Meta.create(dadosValidos)
            expect(meta.id).toBeDefined()
            expect(typeof meta.id).toBe('string')
            expect(meta.id.length).toBeGreaterThan(0)
        })

    })
    describe('create() - validação de nome', () => {

        it('O nome deve ter no mínimo 1 caractere', () => {
            expect(() => 
            Meta.create({...dadosValidos, nome:''})).toThrow("O nome é obrigatório")
        })

    })

    describe('create() - validação de saldo', () => {

        it('o valor_total deve ser maior que 0', () => {
            expect(() => 
            Meta.create({...dadosValidos, valor_total:0})).toThrow("O valor total é obrigatório")
        })

    })
    
    describe('updateValorGuardado()', () => {

        it('Deve atualizar uma meta', () => {
            const meta = Meta.create(dadosValidos)
            meta.updateValorGuardado(100)
            expect(meta.valor_guardado).toBe(100)
        })

    })

    describe('updateValorGuardado() - validação de valor', () => {

        it('o valor deve ser maior que 0', () => {
            const meta = Meta.create(dadosValidos)
            expect(() => 
            meta.updateValorGuardado(0)).toThrow("O valor guardado deve ser maior que 0")
        })
        it('o valor não pode ser maior que o valor_total da meta', () => {
            const meta = Meta.create(dadosValidos)
            expect(() => 
            meta.updateValorGuardado(1100)).toThrow("O valor guardado não pode ser maior que o valor total da meta")
        })
    })

    describe('metaAtingida()', () => {
        
        it('Deve retornar true quando valor_guardado for igual ao valor_total', () => {
            const meta = Meta.create({...dadosValidos, valor_guardado : 1000})
            expect(meta.metaAtingida()).toBe(true)
        })

        it('Deve retornar false quando valor_guardado for menor que valor_total', () => {
            const meta = Meta.create({...dadosValidos, valor_guardado : 900})
            expect(meta.metaAtingida()).toBe(false)
        })

    })

    describe('valorRestante()', () => {
        
        it('Deve retornar a diferença entre valor_total e valor_guardado', () => {
            const meta = Meta.create({...dadosValidos, valor_guardado : 200})
            expect(meta.valorRestante()).toBe(800)
        })

        it('Deve retornar 0 quando valor_total e valor_guardado forem iguais', () => {
            const meta = Meta.create({...dadosValidos, valor_guardado : 1000})
            expect(meta.valorRestante()).toBe(0)
        })

    })

    describe('createFromPrimitives()', () => {
            it('Deve recriar uma meta a partir de dados primitivos', () => {

                const data = new Date('2024-01-01')

                const carteira = Meta.createFromPrimitives({
                    id : 'id',
                    id_usuario : 'id_usuario',
                    nome: 'nome_meta',
                    valor_total : 1000,
                    valor_guardado: 50,
                    descricao: '',
                    criado_em: data

                })
                expect(carteira.id).toBe('id')
                expect(carteira.id_usuario).toBe('id_usuario')
                expect(carteira.nome).toBe('nome_meta')
                expect(carteira.valor_total).toBe(1000)
                expect(carteira.valor_guardado).toBe(50)
                expect(carteira.descricao).toBe('')
                expect(carteira.criado_em).toEqual(data)
            })
        })

})