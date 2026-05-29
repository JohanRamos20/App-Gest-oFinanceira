import bcrypt from 'bcrypt';
import { Usuario } from "../../../domain/entities/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";

export interface UpdatePasswordRequest {
    nome: string;
    email: string;
    senha: string;
}

class UpdatePassword {
    constructor(private usuarioRepository: UsuarioRepository) {}
    
    async updatePassword (id: string, novaSenha: string) : Promise<Usuario> {
        const usuarioExistente = await this.usuarioRepository.findByID(id);
        if (!usuarioExistente) {
            throw new Error("Usuário não encontrado");
        }

        const senhaHash = await bcrypt.hash(novaSenha, 10);

        const isMatch = await bcrypt.compare(novaSenha, usuarioExistente.senha_hash);

        if(isMatch){
            throw new Error("A nova senha deve ser diferente da senha atual");
        }

        usuarioExistente.atualizarSenha(senhaHash);

        return await this.usuarioRepository.create(usuarioExistente);
    }
}