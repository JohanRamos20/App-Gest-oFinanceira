import { Request, Response } from "express";
import { TipoTransacao, Categorias ,isCategoria, isTipoTransacao } from "../../../domain/entities/transacao";
import { FiltroTransacao } from "../../../domain/repository/transacao-repository";
import { type CreateTransacaoUseCase } from "../../../application/use-cases/transacao/createTransacao";
import { type FindTransacaoTypesUseCase } from "../../../application/use-cases/transacao/findTransacaoTypes";

export interface TransacaoUseCases {
    createTransacao: CreateTransacaoUseCase;
    findTransacaoTypes: FindTransacaoTypesUseCase;
}

export class TransacaoController {
    constructor(private readonly transacaoUseCases: TransacaoUseCases) {}

    async createTransacao(req: Request, res: Response): Promise<void> {
        try{
            const { id_usuario } = req.params
            if(!id_usuario || Array.isArray(id_usuario)){
                res.status(400).json({message: "ID de usuário inválido"});
                return;
            }
            const transacao = await this.transacaoUseCases.createTransacao.create({
                ...req.body,
                id_usuario
            })
            res.status(201).json(transacao);
        }
        catch (error) {
            res.status(400).json({
                error: error instanceof Error ? error.message : String(error)
            })
        }
    }

    async findTransacaoTypes(req: Request, res: Response): Promise<void> {
        try{
            const { id_usuario } = req.params
            if(!id_usuario || Array.isArray(id_usuario)){
                res.status(400).json({message: "ID de usuário inválido"});
                return;
            }
            const { categoria, tipo_transacao } = req.query;

            if (categoria !== undefined && !isCategoria(categoria)) {
                res.status(400).json({ message: "Categoria inválida" });
                return;
            }

            if (tipo_transacao !== undefined && !isTipoTransacao(tipo_transacao)) {
                res.status(400).json({ message: "Tipo de transação inválido" });
                return;
            }

            const filtro: FiltroTransacao = {
                categoria: categoria as Categorias | undefined,
                tipoTransacao: tipo_transacao as TipoTransacao | undefined
            };

            const transacoes = await this.transacaoUseCases.findTransacaoTypes.find({
                id_usuario,
                filtro
            });
            res.status(200).json(transacoes);
        } catch (error) {            
            res.status(400).json({
                error: error instanceof Error ? error.message : String(error)
            })
        }
    }

}