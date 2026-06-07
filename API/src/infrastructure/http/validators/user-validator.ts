import { z } from 'zod'

export const createUserSchema = z.object({
    nome: z.string().trim().min(3).max(100),
    email: z.email(),
    senha: z.string().min(4).max(100)
}).strict()

export const updateUserPasswordSchema = z.object({
    senha_atual: z.string().min(4).max(100),
    senha_nova: z.string().min(4).max(100)
}).strict()

export const loginUserSchema = z.object({
    email: z.email(),
    senha: z.string().min(4).max(100)
}).strict()

export const userIdSchema = z.object({
    id_usuario : z.string().uuid()
})