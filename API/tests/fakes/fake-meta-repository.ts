import { Meta } from "../../src/domain/entities/meta"
import { MetasRepository } from "../../src/domain/repositories/meta-repository"

export class FakeMetasRepository implements MetasRepository {
    private metas : Meta[] = []

    async createMeta(data: Meta): Promise<Meta> {
        this.metas.push(data)
        return data
    }

    async getAllMetasByUser(id_usuario: string): Promise<Meta[]> {
        return this.metas.filter(m => m.id_usuario === id_usuario)
    }

    async findMetaByID(id: string, id_usuario: string): Promise<Meta | null> {
        return this.metas.find(m => m.id === id && m.id_usuario === id_usuario) ?? null
    }

    async deleteMeta(id: string, id_usuario: string): Promise<void> {
        const index = this.metas.findIndex(m => m.id === id && m.id_usuario === id_usuario)

        if(index !== -1){
            this.metas.splice(index, 1)
        }

    }

    async updateMeta(meta: Meta, id_usuario: string): Promise<Meta> {
        const index = this.metas.findIndex(m => m.id === meta.id && m.id_usuario === id_usuario)
        if(index !== -1){
            this.metas[index] = meta
        }
        return meta
    }

    getAll(): Meta[] {
            return [...this.metas]
        }

}
