import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repository/meta-repository";

export interface DeleteMetaRequest {
    id_meta: string;
}

export class DeleteMetaUseCase {
    constructor(private metaRepository: MetasRepository) {}

    async delete (req: DeleteMetaRequest) : Promise<void> {
        const metaDelete = await this.metaRepository.findMetaByID(req.id_meta);

        if (!metaDelete) {
            throw new Error("Meta não encontrada");
        }
        await this.metaRepository.deleteMeta(req.id_meta);
    }
}