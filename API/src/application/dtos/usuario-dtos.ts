import { Usuario } from "../../domain/entities/usuario"

export interface UsuarioDto{
    id: string;
    nome: string;
    email: string;
    criado_em: Date;
}

export function toUsuarioDto(usuario: Usuario) : UsuarioDto{
    return {
        id : usuario.id,
        nome : usuario.nome,
        email: usuario.email,
        criado_em: usuario.criado_em
    }
}