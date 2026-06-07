import {NextFunction, Request, Response} from "express";
import {type CreateUserUseCase} from "../../../application/use-cases/usuarios/createUser";
import {type UpdatePasswordUseCase} from "../../../application/use-cases/usuarios/updatePassword";
import {type UserWalletUseCase} from "../../../application/use-cases/usuarios/userWallet";
import {type LoginUserUseCase} from "../../../application/use-cases/usuarios/loginUser";

export interface UsuarioUseCases {
    createUser: CreateUserUseCase;
    updatePassword: UpdatePasswordUseCase;
    userWallet: UserWalletUseCase;
    loginUser: LoginUserUseCase;
}

export class UsuarioController{
    constructor(private readonly usuarioUseCases: UsuarioUseCases) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const usuario = await this.usuarioUseCases.createUser.create(req.body)
            res.status(201).json(usuario);
        } catch (error) {
            next(error)
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const {id_usuario} = req.params
            if(!id_usuario || Array.isArray(id_usuario)){
                res.status(400).json({message: "ID inválido"});
                return;
            }
            await this.usuarioUseCases.updatePassword.update({ ...req.body, id_usuario})
            res.status(200).json({message: "Senha alterada com sucesso!"})
        }
        catch (error) {
            next(error)
        }
    }

    async userWallet(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const { id_usuario } = req.params

            if(!id_usuario || Array.isArray(id_usuario)){
                res.status(400).json({message: "ID inválido"});
                return;
            }

            const wallet = await this.usuarioUseCases.userWallet.getUserWallet({id_usuario})
            res.status(200).json(wallet)
        }
        catch (error) {
            next(error)
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const tokenLogin = await this.usuarioUseCases.loginUser.login(req.body)
            res.status(200).json({tokenLogin})
        }
        catch (error) {            
            next(error)
        }
    }

}