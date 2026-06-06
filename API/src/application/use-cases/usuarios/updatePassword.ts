import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { PasswordHasher } from '../../../domain/services/password-hasher';

export interface UpdatePasswordRequest {
    id_usuario: string;
    senha: string;
}

export class UpdatePasswordUseCase {
    constructor(private usuarioRepository: UsuarioRepository,
        private passwordHasher: PasswordHasher
    ) {}
    
    async update (req: UpdatePasswordRequest) : Promise<void> {
        const usuarioExistente = await this.usuarioRepository.findByID(req.id_usuario);
        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        const senhaHash = await this.passwordHasher.hash(req.senha);
        const isMatch = await this.passwordHasher.compare(req.senha, usuarioExistente.senha_hash);

        if(isMatch) {
            throw new Error("A nova senha deve ser diferente da senha atual");
        }

        return await this.usuarioRepository.updatePassword(usuarioExistente.id, senhaHash);
    }
}