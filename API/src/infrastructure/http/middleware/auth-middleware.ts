import { type NextFunction, type Request, type Response } from "express";
import { type TokenGenerator} from "../../../domain/services/token-generator";
import { JwtTokenGenerator } from "../../services/jwt-token-generator";

export function extractBearerToken(authorizationHeader?: string) : string {
    console.log('Authorization header:', authorizationHeader)

    if(!authorizationHeader){
        throw new Error("Token não informado")
    }

    const [schema, token] = authorizationHeader.split(' ')

    if( schema !== 'Bearer' || !token ){
        throw new Error("Token mal formatado")
    }

    return token

}

export function authMiddleware(tokenGenerator : TokenGenerator = new JwtTokenGenerator()){
    return(request : Request, _response : Response, next : NextFunction): void => {
        try {
            const token = extractBearerToken(request.headers.authorization)
            const payload = tokenGenerator.verify(token)

            request.user = {
                id_usuario : payload?.id_usuario
            }
            next()
        }
        catch (error) {
            next(error)
        }
    }
}