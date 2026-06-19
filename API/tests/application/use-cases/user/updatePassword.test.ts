import { describe, it, expect, beforeEach } from "vitest";
import { FakePasswordHasher } from "../../../fakes/fake-password-hasher";
import { Usuario } from "../../../../src/domain/entities/usuario";
import { UpdatePasswordUseCase } from '../../../../src/application/use-cases/usuarios/updatePassword';
import { FakeUsuarioRepository } from "../../../fakes/fake-usuario-repository";

describe('UpdatePasswordUseCase', () => {
    let usuarioRepository : FakeUsuarioRepository;
    let passwordHasher : FakePasswordHasher
    let useCase : UpdatePasswordUseCase

    beforeEach(() => {
        usuarioRepository = new FakeUsuarioRepository()
        passwordHasher = new FakePasswordHasher()

        useCase = new UpdatePasswordUseCase(
            usuarioRepository, 
            passwordHasher
        )
    })

    it('Deve mudar a senha de um usuário existente', async () => {
        const usuario = Usuario.create({
            nome : "Carlos Silva",
            email : "Carlos@email.com",
            senha_hash : "hashed:1234"
        })

        await usuarioRepository.create(usuario)

        await useCase.update({
            id_usuario : usuario.id, 
            senha_atual: "1234", 
            senha_nova : "12345"
        })

        const usuarioSalvo = await usuarioRepository.findByID(usuario.id)

        expect(usuarioSalvo?.senha_hash).toBe("hashed:12345")
    })

    it('Deve lançar businessError se o usuário não for encontrado', async () => {
        const usuario = Usuario.create({
            nome : "Carlos Silva",
            email : "Carlos@email.com",
            senha_hash : "hashed:1234"
        }) 

        await usuarioRepository.create(usuario)

        await expect(
            useCase.update({
                id_usuario : "id_errado", 
                senha_atual: "1234", 
                senha_nova : "12345",
            })
        ).rejects.toMatchObject({
            message: "Usuario não encontrado",
            statusCode : 401
        })
    })

    it('Deve lançar businessError se a senha_atual for diferente da senha do usuário', async () => {
        const usuario = Usuario.create({
            nome : "Carlos Silva",
            email : "Carlos@email.com",
            senha_hash : "hashed:1234"
        })

        await usuarioRepository.create(usuario)

        await expect(
            useCase.update({
                id_usuario : usuario.id, 
                senha_atual: "senha_errada", 
                senha_nova : "12345",
            })
        ).rejects.toMatchObject({
            message: 'Senha incorreta',
            statusCode : 401
        });

        const usuarioSalvo = await usuarioRepository.findByID(usuario.id)
        expect(usuarioSalvo?.senha_hash).toBe("hashed:1234")
    })

    it("Deve lançar erro se senha_nova for igual a senha_hash do usuario", async () => {
        const usuario = Usuario.create({
            nome : "Carlos Silva",
            email : "Carlos@email.com",
            senha_hash : "hashed:1234"
        })

        await usuarioRepository.create(usuario)

        await expect(
            useCase.update({
                id_usuario : usuario.id, 
                senha_atual: "1234", 
                senha_nova : "1234",
            })
        ).rejects.toMatchObject({
            message: 'A senha deve ser diferente da atual',
            statusCode : 401
        });
    })

})
