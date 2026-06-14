import { eventBus } from "../../domain/events/event-bus";
import { CarteiraRepository } from "../../domain/repositories/carteira-repository";
import { TransacaoCriadaEvent } from "../../domain/events/transacao-criada.event";
import { TipoTransacao } from "../../domain/entities/transacao";

export function listenerAtualizarSaldoCache(carteiraRepository : CarteiraRepository){
    eventBus.subscribe<TransacaoCriadaEvent>(TransacaoCriadaEvent.eventName, async (event) => {

        const delta = event.tipo_transacao === TipoTransacao.CREDITO ? event.valor : -event.valor;

        await carteiraRepository.incrementCacheWalletBalance(event.id_carteira, delta)
    })
}