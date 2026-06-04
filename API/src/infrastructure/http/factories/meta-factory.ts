import { PrismaMetaRepository } from "../../repositories/prisma-meta-repository";
import { PrismaUsuarioRepository } from "../../repositories/prisma-usuario-repository";
import { MetaController } from "../controller/meta-controller";
import { CreateMetaUseCase } from "../../../application/use-cases/metas/createMeta";
import { UpdateMetaUseCase } from "../../../application/use-cases/metas/updateMeta";
import { DeleteMetaUseCase } from "../../../application/use-cases/metas/deleteMeta";
import { FindAllMetasUseCase } from "../../../application/use-cases/metas/findAllMetas";
import { prisma } from "../../../database/prisma";

export function makeMetaController(): MetaController {

    const usuarioRepository = new PrismaUsuarioRepository(prisma);
    const metaRepository = new PrismaMetaRepository(prisma);

    return new MetaController({
        createMeta: new CreateMetaUseCase(metaRepository, usuarioRepository),
        updateMeta: new UpdateMetaUseCase(metaRepository),
        deleteMeta: new DeleteMetaUseCase(metaRepository),
        findAllMetas: new FindAllMetasUseCase(metaRepository, usuarioRepository)
    });

}