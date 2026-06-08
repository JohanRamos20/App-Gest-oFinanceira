import { z } from 'zod'

export const createMetaSchema = z.object({
    nome : z.string().trim().min(3).max(100),
    descricao : z.string().min(10).max(150).optional(),
    valor_total: z.number().positive()
})

export const updateMetaSchema = z.object({
    valor: z.number().positive()
})

export const metaIdSchema = z.object({
    id_meta : z.string().uuid()
})