import {Request, Response} from "express";
import {type CreateUserUseCase} from "../../../application/use-cases/usuarios/createUser";
import {type UpdatePasswordUseCase} from "../../../application/use-cases/usuarios/updatePassword";
import {type UserWalletUseCase} from "../../../application/use-cases/usuarios/userWallet";

export interface UsuarioUseCases {
    createUser: CreateUserUseCase;
    updatePassword: UpdatePasswordUseCase;
    userWallet: UserWalletUseCase;
}

export class UsuarioController{
    constructor(private readonly usuarioUseCases: UsuarioUseCases) {}

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const usuario = await this.usuarioUseCases.createUser.create(req.body)
            res.status(201).json(usuario);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    async updatePassword(req: Request, res: Response): Promise<void>{
        try{
            const user = await this.usuarioUseCases.updatePassword.update(req.body)
            res.status(200).json({message: "Senha alterada com sucesso!"})
        }
        catch (error) {
            res.status(400).json({error})
        }
    }

    async userWallet(req: Request, res: Response): Promise<void>{
        try{
            const { id } = req.params

            if(!id || Array.isArray(id)){
                res.status(400).json({message: "ID inválido"});
                return;
            }

            const wallet = await this.usuarioUseCases.userWallet.getUserWallet({id_usuario: id})
            res.status(200).json(wallet)
        }
        catch (error) {
            res.status(400).json({error})
        }
    }
}