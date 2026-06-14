import { eventBus } from "../../domain/events/event-bus";
import { LogAuditoriaRepository } from "../../domain/repositories/log-auditoria-repository";
import { TransacaoCriadaEvent } from "../../domain/events/transacao-criada.event";

export function listenerCreateLogAuditoria( logAuditoriaRepository : LogAuditoriaRepository ){
    eventBus.subscribe<TransacaoCriadaEvent>(TransacaoCriadaEvent.eventName, async(event) => {
        await logAuditoriaRepository.registrar({
                evento: event.nome,
                id_usuario: event.id_usuario,
                id_entidade: event.id_transacao,
                dados: {
                    id: event.id_transacao,
                    nome: event.nome_transacao,
                    valor: event.valor,
                    categoria: event.categoria,
                    tipo_transacao: event.tipo_transacao,
                    id_carteira: event.id_carteira,
                },
            });
    })
}   