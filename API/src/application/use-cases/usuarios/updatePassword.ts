import bcrypt from 'bcrypt';
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";

export interface UpdatePasswordRequest {
    id_usuario: string;
    senha: string;
}

export class UpdatePasswordUseCase {
    constructor(private usuarioRepository: UsuarioRepository) {}
    
    async update (req: UpdatePasswordRequest) : Promise<void> {
        const usuarioExistente = await this.usuarioRepository.findByID(req.id_usuario);
        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        const senhaHash = await bcrypt.hash(req.senha, 10);

        const isMatch = await bcrypt.compare(req.senha, usuarioExistente.senha_hash);

        if(isMatch){
            throw new Error("A nova senha deve ser diferente da senha atual");
        }

        return await this.usuarioRepository.updatePassword(usuarioExistente.id, senhaHash);
    }
}