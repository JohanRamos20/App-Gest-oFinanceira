export interface TokenGenerator {
    generate(payload: { id_usuario: string}): string;
    verify(token: string): { id_usuario: string } | null;
}