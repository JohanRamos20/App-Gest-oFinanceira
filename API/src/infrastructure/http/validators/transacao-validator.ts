import { z } from 'zod'
import { Categorias, TipoTransacao } from '../../../domain/entities/transacao'

export const createTransacaoSchema = z.object({
    nome: z.string().trim().min(3).max(30),
    valor: z.number().positive(),
    categoria: z.nativeEnum(Categorias),
    tipo_transacao: z.nativeEnum(TipoTransacao)
}).strict()

export const findTransacoesTypesSchema = z.object({
    categoria: z.nativeEnum(Categorias).optional(),
    tipo_transacao: z.nativeEnum(TipoTransacao).optional()
}).strict()
