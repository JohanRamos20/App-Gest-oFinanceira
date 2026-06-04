import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repository/meta-repository";
import { MetaDto, toMetaDto } from "../../dtos/metas-dtos";

export interface UpdateMetaRequest {
    id_meta: string;
    valor: number;
}

export class UpdateMetaUseCase {
    constructor(private metaRepository: MetasRepository) {}

    async update (req: UpdateMetaRequest) : Promise<MetaDto> {
        const meta = await this.metaRepository.findMetaByID(req.id_meta);

        if (!meta) {
            throw new Error("Meta não encontrada");
        }

        this.metaRepository.updateMeta(meta)

        return toMetaDto(meta);
    }
}