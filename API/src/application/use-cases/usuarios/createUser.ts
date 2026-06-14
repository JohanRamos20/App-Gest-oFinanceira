import { toUsuarioDto, UsuarioDto } from '../../dtos/usuario-dtos';
import { Usuario } from "../../../domain/entities/usuario";
import { UsuarioRepository } from "../../../domain/repositories/usuario-repository";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";
import { Carteira } from "../../../domain/entities/carteira";
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { BusinessError } from '../../../domain/errors/business-error';

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

        const email = req.email.trim().toLowerCase()
        
        const usuarioExistente =  await this.usuarioRepository.findByEmail(email);
        if(usuarioExistente) {
            throw new BusinessError("Email já cadastrado", 409);
        }

        if(req.senha.length < 4) {
            throw new BusinessError("A senha deve conter no mínimo 4 caracteres");
        }

        const hashedPassword = await this.passwordHasher.hash(req.senha);

        const usuario = Usuario.create({
            nome: req.nome,
            email: email,
            senha_hash: hashedPassword
        });
        
        await this.usuarioRepository.create(usuario);

        const userWallet = Carteira.create({
            id_usuario: usuario.id,
        });

        await this.carteiraRepository.createWallet(userWallet);

        return toUsuarioDto(usuario);
    }
}