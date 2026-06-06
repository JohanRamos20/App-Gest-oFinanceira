import { Meta } from "../../domain/entities/meta";
import { Metas as PrismaMeta } from "@prisma/client";
import { MetasRepository } from "../../domain/repositories/meta-repository";
import {prisma} from "../../database/prisma";

export class PrismaMetaRepository implements MetasRepository {
    constructor(private Prisma: typeof prisma) {}

    async createMeta(data: Meta): Promise<Meta> {
        const criada = await this.Prisma.metas.create({
            data: {
                id: data.id,
                id_usuario: data.id_usuario,
                nome: data.nome,
                descricao: data.descricao,
                valor_total: data.valor_total,
                valor_guardado: data.valor_guardado,
            }
        });
        return this.toDomain(criada);
    }
    
    async getAllMetasByUser(id_usuario: string): Promise<Meta[]> {
        const metas = await this.Prisma.metas.findMany({
            where: { id_usuario },
            orderBy: { criado_em: "desc" },
        });
        return metas.map((m) => this.toDomain(m));
    }

    async findMetaByID(id: string): Promise<Meta | null> {
        const meta = await this.Prisma.metas.findUnique({
            where: { id },
        });
        return meta ? this.toDomain(meta) : null;
    }
    async updateMeta(meta: Meta): Promise<Meta> {
        const atualizada = await this.Prisma.metas.update({
            where: { id: meta.id },
            data: {
                nome: meta.nome,
                descricao: meta.descricao,
                valor_total: meta.valor_total,
                valor_guardado: meta.valor_guardado,
            },
        });
        return this.toDomain(atualizada);
    }

    async deleteMeta(id: string): Promise<void> {
        await this.Prisma.metas.delete({
            where: { id },
        });
    }

    private toDomain(meta: PrismaMeta): Meta {
        return Meta.createFromPrimitives({
            id: meta.id,
            id_usuario: meta.id_usuario,
            nome: meta.nome,
            descricao: meta.descricao,
            valor_total: Number(meta.valor_total),
            valor_guardado: Number(meta.valor_guardado),
            criado_em: meta.criado_em,
        });
    }
}