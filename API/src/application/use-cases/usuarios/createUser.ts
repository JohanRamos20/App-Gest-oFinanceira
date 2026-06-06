import { toUsuarioDto, UsuarioDto } from '../../dtos/usuario-dtos';
import { Usuario } from "../../../domain/entities/usuario";
import { UsuarioRepository } from "../../../domain/repository/usuario-repository";
import { CarteiraRepository } from "../../../domain/repository/carteira-repository";
import { Carteira } from "../../../domain/entities/carteira";
import { PasswordHasher } from '../../../domain/services/password-hasher';

export interface CreateUserRequest{
    nome: string;
    email: string;
    senha: string;
}

export class CreateUserUseCase {
    constructor(private usuarioRepository: UsuarioRepository,
        private carteiraRepository: CarteiraRepository,
        private passwordHasher: PasswordHasher
    ) {}

    async create (req: CreateUserRequest) : Promise<UsuarioDto> {
        
        const usuarioExistente =  await this.usuarioRepository.findByEmail(req.email);
        if(usuarioExistente) {
            throw new Error("Email já cadastrado");
        }

        if(req.senha.length < 4) {
            throw new Error("A senha deve conter no mínimo 4 caracteres");
        }

        const hashedPassword = await this.passwordHasher.hash(req.senha);

        const usuario = Usuario.create({
            nome: req.nome,
            email: req.email,
            senha_hash: hashedPassword
        });
        
        await this.usuarioRepository.create(usuario);

        const userWallet = Carteira.create({
            id_usuario: usuario.id,
            saldo_cache: 0
        });

        await this.carteiraRepository.createWallet(userWallet);

        return toUsuarioDto(usuario);
    }
}