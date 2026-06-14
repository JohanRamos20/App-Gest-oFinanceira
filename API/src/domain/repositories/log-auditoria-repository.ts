export interface LogAuditoria {
    evento : string,
    id_usuario : string;
    id_entidade: string;
    dados: unknown;
}

export interface LogAuditoriaRepository{
    registrar(data: LogAuditoria): Promise<void>
}