import {NextFunction, Request, Response} from "express";
import {type CreateUserUseCase} from "../../../application/use-cases/usuarios/createUser";
import {type UpdatePasswordUseCase} from "../../../application/use-cases/usuarios/updatePassword";
import {type LoginUserUseCase} from "../../../application/use-cases/usuarios/loginUser";
import { userIdSchema, createUserSchema, loginUserSchema, updateUserPasswordSchema } from "../validators/user-validator";

export interface UsuarioUseCases {
    createUser: CreateUserUseCase;
    updatePassword: UpdatePasswordUseCase;
    loginUser: LoginUserUseCase;
}

export class UsuarioController{
    constructor(private readonly usuarioUseCases: UsuarioUseCases) {}

    async createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const body = createUserSchema.parse(req.body)
            const usuario = await this.usuarioUseCases.createUser.create(body)
            res.status(201).json(usuario);
        } catch (error) {
            next(error)
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const { id_usuario } = userIdSchema.parse(req.params)
            const body = updateUserPasswordSchema.parse(req.body)
            await this.usuarioUseCases.updatePassword.update({...body, id_usuario})
            res.status(200).json({message: "Senha alterada com sucesso!"})
        }
        catch (error) {
            next(error)
        }
    }

    async loginUser(req: Request, res: Response, next: NextFunction): Promise<void>{
        try{
            const body = loginUserSchema.parse(req.body)
            const tokenLogin = await this.usuarioUseCases.loginUser.login(body)
            res.status(200).json({tokenLogin})
        }
        catch (error) {            
            next(error)
        }
    }

}