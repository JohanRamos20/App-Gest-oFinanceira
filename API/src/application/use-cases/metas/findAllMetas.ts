import { Meta } from "../../../domain/entities/meta";
import { MetasRepository } from "../../../domain/repository/meta-repository";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";


export interface FindAllMetasRequest {
    id_usuario: string;
}

class FindAllMetas {
    constructor(private metaRepository: MetasRepository, 
        private usuarioRepository: UsuarioRepository) {}

    async findAll (req: FindAllMetasRequest) : Promise<Meta[]> {
        const usuarioCriado = await this.usuarioRepository.findByID(req.id_usuario);

        if (!usuarioCriado) {
            throw new Error("Usuário não encontrado");
        }

        const metasUsuario = await this.metaRepository.getAllMetasByUser(req.id_usuario);

        return metasUsuario;
    }
}