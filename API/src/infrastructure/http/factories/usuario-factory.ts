import { PrismaUsuarioRepository } from "../../repositories/prisma-usuario-repository";
import { PrismaCarteiraRepository } from "../../repositories/prisma-carteira-repository";
import { UsuarioController } from "../controller/usuario-controller";
import { CreateUserUseCase } from "../../../application/use-cases/usuarios/createUser";
import { UpdatePasswordUseCase } from "../../../application/use-cases/usuarios/updatePassword";
import {UserWalletUseCase } from "../../../application/use-cases/usuarios/userWallet";
import { prisma } from "../../../database/prisma";
import { LoginUserUseCase } from "../../../application/use-cases/usuarios/loginUser";
import { BcryptPasswordHasher } from "../../services/bcrypt-password-hasher";
import { JwtTokenGenerator } from "../../services/jwt-token-generator";


export function makeUsuarioController(): UsuarioController {

    const usuarioRepository = new PrismaUsuarioRepository(prisma);
    const carteiraRepository = new PrismaCarteiraRepository(prisma);
    const passwordHasher = new BcryptPasswordHasher
    const tokenGenerator = new JwtTokenGenerator

    return new UsuarioController({
        createUser: new CreateUserUseCase(usuarioRepository, carteiraRepository, passwordHasher),
        updatePassword: new UpdatePasswordUseCase(usuarioRepository, passwordHasher),
        userWallet: new UserWalletUseCase(usuarioRepository),
        loginUser: new LoginUserUseCase(usuarioRepository, passwordHasher, tokenGenerator )
    });
}