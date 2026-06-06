import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repositories/meta-repository";

export interface UpdateMetaRequest {
    id_meta: string;
    valor: number;
}

export type ResultadoUpdateMeta = {
    metaAtingida: boolean;
    valorRestante: number;
}

export class UpdateMetaUseCase {
    constructor(private metaRepository: MetasRepository) {}

    async update (req: UpdateMetaRequest) : Promise<ResultadoUpdateMeta> {
        const meta = await this.metaRepository.findMetaByID(req.id_meta);

        if (!meta) {
            throw new Error("Meta não encontrada");
        }

        meta.updateValorGuardado(req.valor);
        await this.metaRepository.updateMeta(meta)


        return {
            metaAtingida: meta.metaAtingida(),
            valorRestante: meta.valorRestante()
        };
    }
}