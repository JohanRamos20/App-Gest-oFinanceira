import bcrypt from 'bcrypt';
import { Usuario } from "../../../domain/entities/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CarteiraRepository } from "../../../domain/repository/carteira-repository";
import { Carteira } from "../../../domain/entities/carteira";

export interface CreateUserRequest {
    nome: string;
    email: string;
    senha: string;
}

export class CreateUserUseCase {
    constructor(private usuarioRepository: UsuarioRepository, 
        private carteiraRepository: CarteiraRepository) {}

    async create (req: CreateUserRequest) : Promise<Usuario> {
        
        const usuarioExistente =  await this.usuarioRepository.findByEmail(req.email);
        if(usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        if(req.senha.length < 4) {
            throw new Error("A senha deve conter no mínimo 4 caracteres");
        }

        const senhaHash = await bcrypt.hash(req.senha, 10);

        const usuario = Usuario.create({
            nome: req.nome,
            email: req.email,
            senha_hash: senhaHash
        });
        
        await this.usuarioRepository.create(usuario);

        const userWallet = Carteira.create({
            id_usuario: usuario.id,
            saldo_cache: 0
        });

        await this.carteiraRepository.createWallet(userWallet);

        return usuario;
    }
}