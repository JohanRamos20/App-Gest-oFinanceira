import { it, describe, expect } from 'vitest'
import { Usuario } from '../../../src/domain/entities/usuario'

describe('Usuario', () =>{
    const dadosValidos = {
        nome: "João Silva",
        email: "joão@gmail.com",
        senha_hash: "senha123"
    }

    describe ('create()', () => {
        it('Deve criar um usuario válido', () => {
            const usuario = Usuario.create(dadosValidos)

            expect(usuario.nome).toBe('João Silva')
            expect(usuario.email).toBe('joão@gmail.com')
            expect(usuario.senha_hash).toBe('senha123')
        })
        it('Deve gerar um id', () => {
            const usuario = Usuario.create(dadosValidos)

            expect(usuario.id).toBeDefined()
            expect(typeof usuario.id).toBe('string')
            expect(usuario.id.length).toBeGreaterThan(0)
        })
        it('Deve definir criado_em', () => {
            const usuario = Usuario.create(dadosValidos)
            expect(usuario.criado_em).toBeInstanceOf(Date)
        })
    })

    describe('create() - validação de nome', () =>{
        it('Nome não pode ser vazio', () => {
            expect( () => Usuario.create({ ...dadosValidos, nome:'' })).toThrow( 'O nome é obrigatório' )
        })
    })
    describe('create() — validação de email', () => {

    it('deve lançar erro se o email não tiver @', () => {
      expect(() =>
        Usuario.create({ ...dadosValidos, email: 'emailsemarroba.com' })).toThrow('O email é inválido')
        })

    it('deve lançar erro se o email não tiver domínio', () => {
      expect(() =>
        Usuario.create({ ...dadosValidos, email: 'email@' })
      ).toThrow('O email é inválido')
        })

    it('deve lançar erro se o email tiver espaços', () => {
      expect(() =>
        Usuario.create({ ...dadosValidos, email: 'email @email.com' })
      ).toThrow('O email é inválido')
        })
    })    

    describe('createFromPrimitives()', () => {

    it('deve recriar um usuário a partir de dados primitivos', () => {
      const data = new Date('2024-01-01')

      const usuario = Usuario.createFromPrimitives({
        id: 'uuid-123',
        nome: 'Maria',
        email: 'maria@email.com',
        senha_hash: 'hash_456',
        criado_em: data,
      })

      expect(usuario.id).toBe('uuid-123')
      expect(usuario.nome).toBe('Maria')
      expect(usuario.email).toBe('maria@email.com')
      expect(usuario.criado_em).toEqual(data)
    })

  })

})