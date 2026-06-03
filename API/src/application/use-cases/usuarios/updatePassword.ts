import bcrypt from 'bcrypt';
import { Usuario } from "../../../domain/entities/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CreateUserRequest } from './createUser';

export interface UpdatePasswordRequest {
    id: string;
    senha: string;
}

export class UpdatePasswordUseCase {
    constructor(private usuarioRepository: UsuarioRepository) {}
    
    async update (req: UpdatePasswordRequest) : Promise<Usuario> {
        const usuarioExistente = await this.usuarioRepository.findByID(req.id);
        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        const senhaHash = await bcrypt.hash(req.senha, 10);

        const isMatch = await bcrypt.compare(req.senha, usuarioExistente.senha_hash);

        if(isMatch){
            throw new Error("A nova senha deve ser diferente da senha atual");
        }

        usuarioExistente.atualizarSenha(senhaHash);

        return await this.usuarioRepository.create(usuarioExistente);
    }
}