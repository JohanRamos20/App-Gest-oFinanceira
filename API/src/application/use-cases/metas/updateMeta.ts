import { BusinessError } from "../../../domain/errors/business-error";
import { MetasRepository } from "../../../domain/repositories/meta-repository";

export interface UpdateMetaRequest {
    id_meta: string;
    id_usuario: string;
    valor: number;
}

export type ResultadoUpdateMeta = {
    metaAtingida: boolean;
    valorRestante: number;
}

export class UpdateMetaUseCase {
    constructor(private metaRepository: MetasRepository) {}

    async update (req: UpdateMetaRequest) : Promise<ResultadoUpdateMeta> {
        const meta = await this.metaRepository.findMetaByID(req.id_meta, req.id_usuario);

        if (!meta) {
            throw new BusinessError("Meta não encontrada", 404);
        }

        meta.updateValorGuardado(req.valor);
        await this.metaRepository.updateMeta(meta, req.id_usuario)


        return {
            metaAtingida: meta.metaAtingida(),
            valorRestante: meta.valorRestante()
        };
    }
}
