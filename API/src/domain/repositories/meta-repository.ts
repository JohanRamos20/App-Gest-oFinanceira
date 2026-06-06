import { Meta } from "../entities/meta";

export interface MetasRepository {
    createMeta(data: Meta) : Promise<Meta>;
    getAllMetasByUser(id_usuario: string) : Promise<Meta[]>;
    findMetaByID(id: string) : Promise<Meta | null>;
    updateMeta(meta: Meta) : Promise<Meta>;
    deleteMeta(id: string) : Promise<void>;
}