import { Request, Response } from 'express';
import { type CreateMetaUseCase } from '../../../application/use-cases/metas/createMeta';
import { type DeleteMetaUseCase } from '../../../application/use-cases/metas/deleteMeta';
import { type FindAllMetasUseCase } from '../../../application/use-cases/metas/findAllMetas';
import { type UpdateMetaUseCase } from '../../../application/use-cases/metas/updateMeta';

export interface MetasUseCases {
    createMeta: CreateMetaUseCase;
    updateMeta: UpdateMetaUseCase;
    deleteMeta: DeleteMetaUseCase;
    findAllMetas: FindAllMetasUseCase;
}

export class MetasController {
    constructor(private readonly metasUseCases: MetasUseCases) {}

    async createMeta(req: Request, res: Response): Promise<void> {
        try {
            const meta = await this.metasUseCases.createMeta.create(req.body);
            res.status(201).json(meta);
        }
        catch (error) {
            res.status(400).json({error});
        }
    }

    async updateMeta(req: Request, res: Response): Promise<void> {
        try{
            const meta = await this.metasUseCases.updateMeta.update(req.body);
            res.status(200).json(meta);
        }
        catch (error) {
            res.status(400).json({error});
        }
    }

    async deleteMeta(req: Request, res: Response): Promise<void> {
        try{
            await this.metasUseCases.deleteMeta.delete(req.body);
            res.status(200).json({message: "Meta deletada com sucesso!"});
        }
        catch (error) {
            res.status(400).json({error});
        }
    }

        async findAllMetas(req: Request, res: Response): Promise<void> {
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
            res.status(400).json({error});
        }

}
}