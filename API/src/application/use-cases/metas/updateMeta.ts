import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repository/meta-repository";

export interface UpdateMetaRequest {
    id_meta: string;
    valor: number;
}

class UpdateMeta {
    constructor(private metaRepository: MetasRepository) {}

    async update (req: UpdateMetaRequest) : Promise<Meta> {
        const meta = await this.metaRepository.findMetaByID(req.id_meta);

        if (!meta) {
            throw new Error("Meta não encontrada");
        }

        meta.updateValorGuardado(req.valor);

        return await this.metaRepository.updateMeta(meta);
    }
}