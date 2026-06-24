import { Meta } from "../entities/meta";

export interface MetasRepository {
    createMeta(data: Meta) : Promise<Meta>;
    getAllMetasByUser(id_usuario: string) : Promise<Meta[]>;
    findMetaByID(id: string, id_usuario: string) : Promise<Meta | null>;
    updateMeta(meta: Meta, id_usuario: string) : Promise<Meta>;
    deleteMeta(id: string, id_usuario: string) : Promise<void>;
}
