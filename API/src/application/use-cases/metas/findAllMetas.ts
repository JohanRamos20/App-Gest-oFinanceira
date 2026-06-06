import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repositories/meta-repository";
import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";
import { toMetaDto, MetaDto } from "../../dtos/metas-dtos";


export interface FindAllMetasRequest {
    id_usuario: string;
}

export class FindAllMetasUseCase {
    constructor(private metaRepository: MetasRepository, 
        private usuarioRepository: UsuarioRepository) {}

    async findAll (req: FindAllMetasRequest) : Promise<MetaDto[]> {
        const usuarioCriado = await this.usuarioRepository.findByID(req.id_usuario);

        if (!usuarioCriado) {
            throw new Error("Usuário não encontrado");
        }

        const metasUsuario = await this.metaRepository.getAllMetasByUser(req.id_usuario);

        return metasUsuario.map(toMetaDto);
    }
}