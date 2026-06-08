import { type NextFunction, Request, Response } from 'express';
import { type CreateMetaUseCase } from '../../../application/use-cases/metas/createMeta';
import { type DeleteMetaUseCase } from '../../../application/use-cases/metas/deleteMeta';
import { type FindAllMetasUseCase } from '../../../application/use-cases/metas/findAllMetas';
import { type UpdateMetaUseCase } from '../../../application/use-cases/metas/updateMeta';
import { metaIdSchema, createMetaSchema, updateMetaSchema } from '../validators/meta-validator';
import { userIdSchema } from '../validators/user-validator';

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
            const { id_usuario } = userIdSchema.parse(req.params);
            const body = createMetaSchema.parse(req.body)
            const meta = await this.metasUseCases.createMeta.create({
                ...body,
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

            const { id_meta }  = metaIdSchema.parse(req.params);
            const body = updateMetaSchema.parse(req.body)
            const resultadosUpdateMeta = await this.metasUseCases.updateMeta.update({
                ...body,
                id_meta,
                
            });
            res.status(200).json(resultadosUpdateMeta);
        }
        catch (error) {
            next(error)
        }
    }

    async deleteMeta(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const {id_meta} = metaIdSchema.parse(req.params);
            await this.metasUseCases.deleteMeta.delete({id_meta});
            res.status(200).json({message: "Meta deletada com sucesso!"});
        }
        catch (error) {
            next(error)
        }
    }

    async findAllMetas(req: Request, res: Response, next: NextFunction): Promise<void> {
        try{
            const { id_usuario } = userIdSchema.parse(req.params)
            const metas = await this.metasUseCases.findAllMetas.findAll({id_usuario});
            res.status(200).json(metas);
        }
        catch (error) {
            next(error)
        }
}
}