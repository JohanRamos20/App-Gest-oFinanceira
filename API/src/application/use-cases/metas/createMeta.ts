import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repository/meta-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";

export interface CreateMetaRequest {
    id_usuario: string;
    nome: string;
    descricao?: string;
    valor_total: number;
}

class CreateMeta {
    constructor(private metaRepository: MetasRepository, private usuarioRepository: UsuarioRepository) {}

    async create (req: CreateMetaRequest) : Promise<Meta> {

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

        return await this.metaRepository.createMeta(meta);
    }
        
}