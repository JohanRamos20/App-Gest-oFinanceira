import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";
import { TokenGenerator } from "../../../domain/services/token-generator";
import { PasswordHasher } from "../../../domain/services/password-hasher";
import { UsuarioLoginDto } from "../../dtos/usuario-dtos";
import { BusinessError } from "../../../domain/errors/business-error";

export interface LoginUserRequest {
    email: string;
    senha: string;
}

export class LoginUserUseCase{
    constructor(
        private usuarioRepository: UsuarioRepository,
        private passwordHasher: PasswordHasher,
        private tokenGenerator: TokenGenerator
    ) {}

    async login(req: LoginUserRequest) : Promise<UsuarioLoginDto> {
        const usuario = await this.usuarioRepository.findByEmail(req.email.trim().toLowerCase());
        if(!usuario) {
            throw new BusinessError("E-mail ou senha inválidos");
        }
        const isPasswordValid = await this.passwordHasher.compare(req.senha, usuario.senha_hash);
        if(!isPasswordValid) {
            throw new BusinessError("E-mail ou senha inválidos");
        }
        const token = this.tokenGenerator.generate({ id_usuario : usuario.id });

        return { token }
    }
}