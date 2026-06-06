import { Meta } from "../../../domain/entities/meta";
import { toMetaDto, MetaDto } from "../../dtos/metas-dtos";
import { MetasRepository } from "../../../domain/repositories/meta-repository";
import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";

export interface CreateMetaRequest {
    id_usuario: string;
    nome: string;
    descricao?: string;
    valor_total: number;
}

export class CreateMetaUseCase {
    constructor(private metaRepository: MetasRepository, private usuarioRepository: UsuarioRepository) {}

    async create (req: CreateMetaRequest) : Promise<MetaDto> {

        const usuarioExiste = await this.usuarioRepository.findByID(req.id_usuario);

        if (!usuarioExiste) {
            throw new Error("Usuário não encontrado");
        }

        const meta = Meta.create({
            id_usuario: req.id_usuario,
            nome: req.nome,
            descricao: req.descricao,
            valor_total: req.valor_total,
        });

        await this.metaRepository.createMeta(meta);

        return toMetaDto(meta);
    }
        
}