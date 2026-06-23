import { Usuario } from "../../domain/entities/usuario";
import { UsuarioRepository } from "../../domain/repositories/usuario-repository";
import { Usuario as PrismaUsuario } from "@prisma/client";
import { PrismaRepositoryClient } from "../../database/prisma-repository-client";

export class PrismaUsuarioRepository implements UsuarioRepository {
    constructor(private Prisma: PrismaRepositoryClient) {}

    async create(usuario: Usuario): Promise<Usuario> {
        const criado = await this.Prisma.usuario.create({
            data: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                senha_hash: usuario.senha_hash,
                criado_em: usuario.criado_em,
            },
        });
        return this.toDomain(criado);
    }

    async findByEmail(email: string): Promise<Usuario | null> {
        const encontrado = await this.Prisma.usuario.findUnique({
            where: { email },
        });
        if (!encontrado) {
            return null;
        }
        return this.toDomain(encontrado);
    }

    async findByID(id: string): Promise<Usuario | null> {
        const encontrado = await this.Prisma.usuario.findUnique({
            where: { id },
        });
        if (!encontrado) {
            return null;
        }
        return this.toDomain(encontrado);
    }

    async updatePassword(id_usuario: string, senha: string): Promise<void> {
        const usuario = await this.Prisma.usuario.update({
            where: { id: id_usuario },
            data : {
                senha_hash: senha
            }
        });
    }

    private toDomain(usuario: PrismaUsuario): Usuario {
        return Usuario.createFromPrimitives({
            id: usuario.id,
            nome: usuario.nome,
            email: usuario.email,
            senha_hash: usuario.senha_hash,
            criado_em: usuario.criado_em,
        });
    }
}