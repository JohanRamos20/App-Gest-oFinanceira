import { Request, Response, NextFunction } from 'express'
import { BusinessError } from '../../../domain/errors/business-error'

export async function errorMiddleware(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): Promise<void> {
    if(error instanceof BusinessError){
        res.status(error.statusCode).json({
            error: error.name,
            message: error.message,
        })
        return
    }
    console.error(error)
    res.status(500).json({
        error: 'Erro interno do servidor.'
    })
}