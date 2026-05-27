import { Usuario } from "../entities/usuario";

export interface UsuarioRepository {
    findByID(id: string) : Promise<Usuario | null>;
    findByEmail(email: string) : Promise<Usuario | null>;
    create(data: Usuario) : Promise<Usuario>;
}