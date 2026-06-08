import { NextFunction, Request, Response } from "express";
import { type CreateTransacaoUseCase } from "../../../application/use-cases/transacao/createTransacao";
import { type FindTransacaoTypesUseCase } from "../../../application/use-cases/transacao/findTransacaoTypes";
import { createTransacaoSchema, findTransacoesTypesSchema } from "../validators/transacao-validator";
import { userIdSchema } from "../validators/user-validator";

export interface TransacaoUseCases {
    createTransacao: CreateTransacaoUseCase;
    findTransacaoTypes: FindTransacaoTypesUseCase;
}

export class TransacaoController {
    constructor(private readonly transacaoUseCases: TransacaoUseCases) {}

    async createTransacao(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id_usuario } = userIdSchema.parse(req.params)

            const body = createTransacaoSchema.parse(req.body)

            const transacao = await this.transacaoUseCases.createTransacao.create({
                ...body,
                id_usuario
            })
            res.status(201).json(transacao);
        }
        catch (error) {
            next(error)
        }
    }

    async findTransacaoTypes(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id_usuario } = userIdSchema.parse(req.params)
            
            const filtro = findTransacoesTypesSchema.parse(req.query);

            const transacoes = await this.transacaoUseCases.findTransacaoTypes.find({
                id_usuario,
                filtro
            });
            res.status(200).json(transacoes);
        } catch (error) {            
            next(error)
        }
    }

}