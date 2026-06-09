import { it, expect, describe } from 'vitest'
import { Carteira } from '../../../src/domain/entities/carteira'

describe ('Carteira', () =>{
    const dadosValidos = {
        id_usuario : 'uuid_usuario',
        saldo_cache : 0
    }

    describe('create()', () =>{
        it('Deve criar uma carteira', () =>{
            const carteira = Carteira.create(dadosValidos)
            expect(carteira.saldo_cache).toBe(0)
            expect(carteira.id_usuario).toBe('uuid_usuario')
        })
        it('Deve gerar um id', () => {
            const carteira = Carteira.create(dadosValidos)
            expect(carteira.id).toBeDefined()
        })
    })

    describe('create() - validação de saldo', () => {
        it('O saldo inicial da carteira deve ser 0', () => {
                    expect( () => Carteira.create({ ...dadosValidos, saldo_cache:1 })).toThrow( 'O saldo inicial da carteira deve ser 0' )
                })
    })

    describe('createFromPrimitives()', () => {
        it('Deve recriar uma carteira a partir de dados primitivos', () => {
            const carteira = Carteira.createFromPrimitives({
                id : 'id',
                id_usuario : 'id_usuario',
                saldo_cache : 1,
            })
            expect(carteira.id).toBe('id')
            expect(carteira.id_usuario).toBe('id_usuario')
            expect(carteira.saldo_cache).toBe(1)
        })
    })
})