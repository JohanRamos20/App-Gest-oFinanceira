import { PrismaUsuarioRepository } from "../../repositories/prisma-usuario-repository";
import { PrismaCarteiraRepository } from "../../repositories/prisma-carteira-repository";
import { UsuarioController } from "../controller/usuario-controller";
import { CreateUserUseCase } from "../../../application/use-cases/usuarios/createUser";
import { UpdatePasswordUseCase } from "../../../application/use-cases/usuarios/updatePassword";
import {UserWalletUseCase } from "../../../application/use-cases/usuarios/userWallet";
import { prisma } from "../../../database/prisma";


export function makeUsuarioController(): UsuarioController {

    const usuarioRepository = new PrismaUsuarioRepository(prisma);
    const carteiraRepository = new PrismaCarteiraRepository(prisma);

    return new UsuarioController({
        createUser: new CreateUserUseCase(usuarioRepository, carteiraRepository),
        updatePassword: new UpdatePasswordUseCase(usuarioRepository),
        userWallet: new UserWalletUseCase(usuarioRepository)
    });
}