import { TokenGenerator } from "../../src/domain/services/token-generator"

export class FakeTokenGenerator implements TokenGenerator {
    generate(payload: { id_usuario: string }): string {
        return `fake-token:${payload.id_usuario}`
    }

    verify(token: string): { id_usuario: string } {
        const prefixo = "fake-token:"
        if (!token.startsWith(prefixo)) {
            throw new Error("Token inválido")
        }

        const id_usuario = token.slice(prefixo.length)
        return { id_usuario }
    }
}