import { it, expect, describe } from 'vitest'
import { Transacao} from '../../../src/domain/entities/transacao'

describe('Transacao', () =>{

    const dadosValidos = {
        nome : 'transacao_teste',
        id_carteira : 'id_carteira',
        valor : 100,
        categoria : 'LAZER',
        tipo_transacao : 'DEBITO'
    }

    describe('Create()', () => {

        it('Deve ser capaz de criar uma transação', () => {
            const transacao = Transacao.create(dadosValidos)
            expect(transacao.nome).toBe('transacao_teste')
            expect(transacao.id_carteira).toBe('id_carteira')
            expect(transacao.valor).toBe(100)
            expect(transacao.categoria).toBe('LAZER')
            expect(transacao.tipo_transacao).toBe('DEBITO')
        })

        it('Uma transação deve ter um id', () => {
            const transacao = Transacao.create(dadosValidos)
            expect(transacao.id).toBeDefined()
            expect(typeof transacao.id).toBe('string')
            expect(transacao.id.length).toBeGreaterThan(0)
        })

    })

    describe('Create() - validação de valor', () => {
        it('Valor deve ser maior que zero', () =>{
            expect(() => Transacao.create({...dadosValidos, valor : 0})).toThrow('O valor da transação deve ser maior que zero')
        })
    })

    describe('Create() - validação de nome', () => {
        it('A transação tem que ter nome', () =>{
            expect(() => Transacao.create({...dadosValidos, nome: ''})).toThrow('O nome da transação não pode ser vazio')
        })
    })

    describe('createFromPrimitives()', () => {
    
        it('deve recriar uma transação a partir de dados primitivos', () => {
          const data = new Date('2024-01-01')
    
          const transacao = Transacao.createFromPrimitives({
            id: 'uuid-123',
            id_carteira : 'uuid_carteira',
            nome: 'Syssa',
            valor : 100,
            categoria : 'LAZER',
            tipo_transacao : 'DEBITO',
            criado_em : data
          })
    
          expect(transacao.id).toBe('uuid-123')
          expect(transacao.id_carteira).toBe('uuid_carteira')
          expect(transacao.nome).toBe('Syssa')
          expect(transacao.valor).toBe(100)
          expect(transacao.categoria).toBe('LAZER')
          expect(transacao.tipo_transacao).toBe('DEBITO')
          expect(transacao.criado_em).toEqual(data)
        })
    
      })

})