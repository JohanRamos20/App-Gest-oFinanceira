import { Usuario } from "../../src/domain/entities/usuario"
import { UsuarioRepository } from "../../src/domain/repositories/usuario-repository"

export class FakeUsuarioRepository implements UsuarioRepository {
    private usuarios : Usuario[] = []

    async findByEmail(email: string): Promise<Usuario | null> {
        return this.usuarios.find(u => u.email === email) ?? null
    }

    async findByID(id: string): Promise<Usuario | null> {
        return this.usuarios.find(u => u.id === id) ?? null
    }

    async create(usuario: Usuario): Promise<Usuario> {
        this.usuarios.push(usuario)
        return usuario
    }

    async updatePassword(id_usuario: string, senha: string): Promise<void> {
        const usuario = this.usuarios.find(u => u.id === id_usuario)
        if(usuario){
            usuario.senha_hash = senha
        }
    }
}