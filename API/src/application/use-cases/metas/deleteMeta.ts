import { BusinessError } from "../../../domain/errors/business-error";
import { MetasRepository } from "../../../domain/repositories/meta-repository";

export interface DeleteMetaRequest {
    id_meta: string;
    id_usuario: string;
}

export class DeleteMetaUseCase {
    constructor(private metaRepository: MetasRepository) {}

    async delete (req: DeleteMetaRequest) : Promise<void> {
        const metaDelete = await this.metaRepository.findMetaByID(req.id_meta, req.id_usuario);

        if (!metaDelete) {
            throw new BusinessError("Meta não encontrada", 404);
        }
        await this.metaRepository.deleteMeta(req.id_meta, req.id_usuario);
    }
}
