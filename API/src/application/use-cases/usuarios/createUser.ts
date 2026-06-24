import { toUsuarioDto, UsuarioDto } from '../../dtos/usuario-dtos';
import { Usuario } from "../../../domain/entities/usuario";
import { ITransactionManager } from '../../../domain/managers/ITransactionManager';
import { Carteira } from "../../../domain/entities/carteira";
import { PasswordHasher } from '../../../domain/services/password-hasher';
import { BusinessError } from '../../../domain/errors/business-error';

export interface CreateUserRequest{
    nome: string;
    email: string;
    senha: string;
}

export class CreateUserUseCase {
    constructor(private transactionManager : ITransactionManager,
        private passwordHasher: PasswordHasher
    ) {}

    async create (req: CreateUserRequest) : Promise<UsuarioDto> {

        const email = req.email.trim().toLowerCase()

        if(req.senha.length < 4) {
            throw new BusinessError("A senha deve conter no mínimo 4 caracteres");
        }

        const hashedPassword = await this.passwordHasher.hash(req.senha);

        const usuario = Usuario.create({
            nome: req.nome,
            email: email,
            senha_hash: hashedPassword
        });

        const userWallet = Carteira.create({
            id_usuario: usuario.id,
        });

         return this.transactionManager.execute(
            async ({usuarioRepository, carteiraRepository}) => {
                const existente = await usuarioRepository.findByEmail(email);

                if(existente) {
                    throw new BusinessError("Email já cadastrado", 409)
                }

                await usuarioRepository.create(usuario)
                await carteiraRepository.createWallet(userWallet)

                return toUsuarioDto(usuario);

            }
        )
    }
}