import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CreateUserUseCase } from '../../../../src/application/use-cases/usuarios/createUser';
import { Usuario } from '../../../../src/domain/entities/usuario';
import { UsuarioRepository } from '../../../../src/domain/repositories/usuario-repository';
import { CarteiraRepository } from '../../../../src/domain/repositories/carteira-repository';
import { PasswordHasher } from '../../../../src/domain/services/password-hasher';
import { BusinessError } from '../../../../src/domain/errors/business-error';

describe('CreateUserUseCase', () => {
    let usuarioRepository: UsuarioRepository;
    let carteiraRepository: CarteiraRepository;
    let passwordHasher: PasswordHasher;
    let useCase: CreateUserUseCase;

    beforeEach(() => {
        usuarioRepository = {
            findByEmail: vi.fn(),
            create: vi.fn(),
        } as unknown as UsuarioRepository;

        carteiraRepository = {
            createWallet: vi.fn(),
        } as unknown as CarteiraRepository;

        passwordHasher = {
            hash: vi.fn().mockResolvedValue('hashed_senha_123'),
        } as unknown as PasswordHasher;

        useCase = new CreateUserUseCase(
            usuarioRepository,
            carteiraRepository,
            passwordHasher
        );
    });

    it('deve criar um usuário e sua carteira com sucesso', async () => {
        (usuarioRepository.findByEmail as any).mockResolvedValue(null);

        const result = await useCase.create({
            nome: 'Carlos Silva',
            email: 'Carlos@Email.com',
            senha: '1234',
        });

        expect(usuarioRepository.findByEmail).toHaveBeenCalledWith('carlos@email.com');

        expect(passwordHasher.hash).toHaveBeenCalledWith('1234');

        expect(usuarioRepository.create).toHaveBeenCalledTimes(1);
        const usuarioCriado = (usuarioRepository.create as any).mock.calls[0][0] as Usuario;
        expect(usuarioCriado.email).toBe('carlos@email.com');
        expect(usuarioCriado.senha_hash).toBe('hashed_senha_123');

        expect(carteiraRepository.createWallet).toHaveBeenCalledTimes(1);
        const carteiraCriada = (carteiraRepository.createWallet as any).mock.calls[0][0];
        expect(carteiraCriada.id_usuario).toBe(usuarioCriado.id);
        expect(carteiraCriada.saldo_cache).toBe(0);

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

        (usuarioRepository.findByEmail as any).mockResolvedValue(usuarioExistente);

        await expect(
            useCase.create({
                nome: 'Novo Usuário',
                email: 'ja@existe.com',
                senha: '1234',
            })
        ).rejects.toThrow(BusinessError);

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

        expect(usuarioRepository.create).not.toHaveBeenCalled();
        expect(carteiraRepository.createWallet).not.toHaveBeenCalled();
    });

    it('deve lançar BusinessError se a senha tiver menos de 4 caracteres', async () => {
        (usuarioRepository.findByEmail as any).mockResolvedValue(null);

        await expect(
            useCase.create({
                nome: 'Carlos Silva',
                email: 'carlos@email.com',
                senha: '123',
            })
        ).rejects.toThrow('A senha deve conter no mínimo 4 caracteres');

        expect(passwordHasher.hash).not.toHaveBeenCalled();
        expect(usuarioRepository.create).not.toHaveBeenCalled();
        expect(carteiraRepository.createWallet).not.toHaveBeenCalled();
    });

    it('deve propagar erro de validação da entidade Usuario (ex: email inválido)', async () => {
        (usuarioRepository.findByEmail as any).mockResolvedValue(null);

        await expect(
            useCase.create({
                nome: 'Carlos Silva',
                email: 'email-invalido',
                senha: '1234',
            })
        ).rejects.toThrow('O email é inválido');
    });
});