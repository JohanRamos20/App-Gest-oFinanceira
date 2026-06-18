import { describe, it, expect, beforeEach } from 'vitest';
import { CreateUserUseCase } from '../../../../src/application/use-cases/usuarios/createUser';
import { Usuario } from '../../../../src/domain/entities/usuario';
import { FakeUsuarioRepository } from '../../../fakes/fake-usuario-repository';
import { FakeCarteiraRepository } from '../../../fakes/fake-wallet-repository';
import { FakePasswordHasher } from '../../../fakes/fake-password-hasher';

describe('CreateUserUseCase', () => {
    let usuarioRepository: FakeUsuarioRepository;
    let carteiraRepository: FakeCarteiraRepository;
    let passwordHasher: FakePasswordHasher;
    let useCase: CreateUserUseCase;

    beforeEach(() => {
        usuarioRepository = new FakeUsuarioRepository()
        carteiraRepository = new FakeCarteiraRepository()
        passwordHasher = new FakePasswordHasher()

        useCase = new CreateUserUseCase(
            usuarioRepository,
            carteiraRepository,
            passwordHasher
        );
    });

    it('deve criar um usuário e sua carteira com sucesso', async () => {
        const result = await useCase.create({
            nome: 'Carlos Silva',
            email: 'Carlos@Email.com',
            senha: '1234',
        });

        const usuarioCriado = await usuarioRepository.findByEmail("carlos@email.com")
        expect(usuarioCriado).not.toBeNull()
        expect(usuarioCriado?.email).toBe("carlos@email.com")
        expect(usuarioCriado?.senha_hash).toBe("hashed:1234")

        const carteiras = carteiraRepository.getAll()
        expect(carteiras).toHaveLength(1)
        expect(carteiras[0].id_usuario).toBe(usuarioCriado?.id)

        expect(result).not.toHaveProperty('senha_hash');
        expect(result.email).toBe('carlos@email.com');
        expect(result.nome).toBe('Carlos Silva');
    });

    it('deve lançar BusinessError 409 se o email já estiver cadastrado', async () => {
        const usuarioExistente = Usuario.create({
            nome: 'Existente',
            email: 'ja@existe.com',
            senha_hash: 'qualquer_hash',
        });
        await usuarioRepository.create(usuarioExistente)

        await expect(
            useCase.create({
                nome: 'Novo Usuário',
                email: 'ja@existe.com',
                senha: '1234',
            })
        ).rejects.toMatchObject({
            message: 'Email já cadastrado',
            statusCode: 409,
        });

        expect(usuarioRepository.getAll()).toHaveLength(1)
        expect(carteiraRepository.getAll()).toHaveLength(0)
    });

    it('deve lançar BusinessError se a senha tiver menos de 4 caracteres', async () => {
        await expect(
            useCase.create({
                nome: 'Carlos Silva',
                email: 'carlos@email.com',
                senha: '123',
            })
        ).rejects.toThrow('A senha deve conter no mínimo 4 caracteres');

        expect(usuarioRepository.getAll()).toHaveLength(0)
        expect(carteiraRepository.getAll()).toHaveLength(0)
    });

    it('deve propagar erro de validação da entidade Usuario (ex: email inválido)', async () => {
        await expect(
            useCase.create({
                nome: 'Carlos Silva',
                email: 'email-invalido',
                senha: '1234',
            })
        ).rejects.toThrow('O email é inválido');
    });
});