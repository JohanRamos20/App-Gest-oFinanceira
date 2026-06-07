import { type NextFunction, Request, Response } from 'express';
import { type CreateMetaUseCase } from '../../../application/use-cases/metas/createMeta';
import { type DeleteMetaUseCase } from '../../../application/use-cases/metas/deleteMeta';
import { type FindAllMetasUseCase } from '../../../application/use-cases/metas/findAllMetas';
import { type UpdateMetaUseCase } from '../../../application/use-cases/metas/updateMeta';

export interface MetaUseCases {
    createMeta: CreateMetaUseCase;
    updateMeta: UpdateMetaUseCase;
    deleteMeta: DeleteMetaUseCase;
    findAllMetas: FindAllMetasUseCase;
}

export class MetaController {
    constructor(private readonly metasUseCases: MetaUseCases) {}

    async createMeta(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { id_usuario } = req.params;
            if (!id_usuario || Array.isArray(id_usuario)) {
                res.status(400).json({ message: "ID de usuário inválido" });
                return;
            }
            const meta = await this.metasUseCases.createMeta.create({
                ...req.body,
                id_usuario
            });
            res.status(201).json(meta);
        }
        catch (error) {
            next(error)
        }
    }

    async updateMeta(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{

            const { id_meta }  = req.params;
            if(!id_meta || Array.isArray(id_meta)){
                res.status(400).json({message: "ID de meta inválido"});
                return;
            }
            const resultadosUpdateMeta = await this.metasUseCases.updateMeta.update({
                id_meta,
                valor: req.body.valor
            });
            res.status(200).json(resultadosUpdateMeta);
        }
        catch (error) {
            next(error)
        }
    }

    async deleteMeta(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const {id_meta} = req.params;
            if(!id_meta || Array.isArray(id_meta)){
                res.status(400).json({message: "ID de meta inválido"});
                return;
            }
            await this.metasUseCases.deleteMeta.delete({id_meta});
            res.status(200).json({message: "Meta deletada com sucesso!"});
        }
        catch (error) {
            next(error)
        }
    }

    async findAllMetas(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id_usuario } = req.params
            if(!id_usuario || Array.isArray(id_usuario)){
                res.status(400).json({message: "ID de usuário inválido"});
                return;
            }
            const metas = await this.metasUseCases.findAllMetas.findAll({id_usuario});
            res.status(200).json(metas);
        }
        catch (error) {
            next(error)
        }
}
}