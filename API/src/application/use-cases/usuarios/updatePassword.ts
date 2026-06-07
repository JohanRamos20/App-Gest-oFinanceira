import { BusinessError } from "../../../domain/errors/business-error";
import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";
import { PasswordHasher } from '../../../domain/services/password-hasher';

export interface UpdatePasswordRequest {
    id_usuario: string;
    senha_nova: string;
    senha_atual: string;
}

export class UpdatePasswordUseCase {
    constructor(private usuarioRepository: UsuarioRepository,
        private passwordHasher: PasswordHasher
    ) {}
    
    async update (req: UpdatePasswordRequest) : Promise<void> {
        const usuarioExistente = await this.usuarioRepository.findByID(req.id_usuario);
        if (!usuarioExistente) {
            throw new BusinessError('Usuario não encontrado', 401)
        }

        const validarSenha = await this.passwordHasher.compare(req.senha_atual, usuarioExistente.senha_hash);

        if(!validarSenha) {
            throw new BusinessError('Senha incorreta', 401)
        }

        const isMatch = await this.passwordHasher.compare(req.senha_nova, usuarioExistente.senha_hash)

        if(isMatch) {
            throw new BusinessError('A senha deve ser diferente da atual', 401)
        }

        const senhaNovaHash = await this.passwordHasher.hash(req.senha_nova);

        return await this.usuarioRepository.updatePassword(usuarioExistente.id, senhaNovaHash);
    }
}