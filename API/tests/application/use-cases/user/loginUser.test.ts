import { describe, it, expect, beforeEach } from 'vitest';
import { LoginUserUseCase } from '../../../../src/application/use-cases/usuarios/loginUser';
import { Usuario } from '../../../../src/domain/entities/usuario';
import { FakeUsuarioRepository } from '../../../fakes/fake-usuario-repository';
import { FakePasswordHasher } from '../../../fakes/fake-password-hasher';
import { FakeTokenGenerator } from '../../../fakes/fake-token-generator';
import { BusinessError } from '../../../../src/domain/errors/business-error';

describe('LoginUserUseCase', () => {
    let usuarioRepository: FakeUsuarioRepository;
    let passwordHasher: FakePasswordHasher;
    let tokenGenerator: FakeTokenGenerator;
    let useCase: LoginUserUseCase;

    beforeEach(() => {
        usuarioRepository = new FakeUsuarioRepository()
        passwordHasher = new FakePasswordHasher()
        tokenGenerator = new FakeTokenGenerator()

        useCase = new LoginUserUseCase(
            usuarioRepository,
            passwordHasher,
            tokenGenerator
        );
    });

    it('deve autenticar com sucesso e retornar um token', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        });
        await usuarioRepository.create(usuario)

        const result = await useCase.login({
            email: 'Carlos@Email.com',
            senha: '1234',
        });

        expect(result.token).toBe(`fake-token:${usuario.id}`)
    });

    it('deve normalizar o email antes de buscar o usuário', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        });
        await usuarioRepository.create(usuario)

        const result = await useCase.login({
            email: '  CARLOS@EMAIL.COM  ',
            senha: '1234',
        });

        expect(result.token).toBeDefined()
    });

    it('deve lançar BusinessError se o email não estiver cadastrado', async () => {
        await expect(
            useCase.login({
                email: 'inexistente@email.com',
                senha: '1234',
            })
        ).rejects.toMatchObject({
            message: 'E-mail ou senha inválidos',
        });
    });

    it('deve lançar BusinessError se a senha estiver incorreta', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        });
        await usuarioRepository.create(usuario)

        await expect(
            useCase.login({
                email: 'carlos@email.com',
                senha: 'senha_errada',
            })
        ).rejects.toThrow(BusinessError);
    });

    it('não deve revelar se o erro foi de email ou senha (mesma mensagem)', async () => {
        const usuario = Usuario.create({
            nome: 'Carlos Silva',
            email: 'carlos@email.com',
            senha_hash: 'hashed:1234',
        });
        await usuarioRepository.create(usuario)

        let erroEmailInvalido: any;
        let erroSenhaInvalida: any;

        try {
            await useCase.login({ email: 'naoexiste@email.com', senha: '1234' });
        } catch (e) {
            erroEmailInvalido = e;
        }

        try {
            await useCase.login({ email: 'carlos@email.com', senha: 'errada' });
        } catch (e) {
            erroSenhaInvalida = e;
        }

        expect(erroEmailInvalido.message).toBe(erroSenhaInvalida.message);
    });
});