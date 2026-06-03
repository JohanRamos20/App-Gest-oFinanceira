import { Usuario } from "../entities/usuario";
import { Carteira } from "../entities/carteira";


export interface UsuarioRepository {
    findByID(id: string) : Promise<Usuario | null>;
    findByEmail(email: string) : Promise<Usuario | null>;
    create(data: Usuario) : Promise<Usuario>;
    updatePassword(id_usuario: string, senha: string) : Promise<void>;
    findWallet(id_usuario: string) : Promise<Carteira | null>;
}