import { it, expect, describe } from 'vitest'
import { Carteira } from '../../../src/domain/entities/carteira'

describe ('Carteira', () =>{
    const dadosValidos = {
        id_usuario : 'uuid_usuario',
    }

    describe('create()', () =>{
        it('Deve criar uma carteira', () =>{
            const carteira = Carteira.create(dadosValidos)
            expect(carteira.id_usuario).toBe('uuid_usuario')
        })
        it('Deve gerar um id', () => {
            const carteira = Carteira.create(dadosValidos)
            expect(carteira.id).toBeDefined()
            expect(typeof carteira.id).toBe('string')
            expect(carteira.id.length).toBeGreaterThan(0)
        })
    })

    describe('createFromPrimitives()', () => {
        it('Deve recriar uma carteira a partir de dados primitivos', () => {
            const carteira = Carteira.createFromPrimitives({
                id : 'id',
                id_usuario : 'id_usuario',
            })
            expect(carteira.id).toBe('id')
            expect(carteira.id_usuario).toBe('id_usuario')
        })
    })
})