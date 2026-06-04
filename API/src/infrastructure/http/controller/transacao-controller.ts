import { Request, Response } from "express";
import { type CreateTransacaoUseCase } from "../../../application/use-cases/transacao/createTransacao";

export interface TransacaoUseCases {
    createTransacao: CreateTransacaoUseCase;
}

export class TransacaoController {
    constructor(private readonly transacaoUseCases: TransacaoUseCases) {}

    async createTransacao(req: Request, res: Response): Promise<void> {
        try{
            const transacao = await this.transacaoUseCases.createTransacao.create(req.body)
            res.status(201).json(transacao);
        }
        catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : String(error)
            })
        }
    }
}