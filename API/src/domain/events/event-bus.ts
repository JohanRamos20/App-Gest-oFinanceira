import { EventEmitter } from "events";
import { Event } from "./domain-event";

class EventBus {
    private emitter = new EventEmitter();

    publish(event: Event): void {
        this.emitter.emit(event.nome, event)
    }

    subscribe<T extends Event> (
        nome : string,
        handler : (event : T) => Promise<void> | void
    ): void {
        this.emitter.on(nome, async (event : T) => {
            try {
                await handler(event)
            } catch (err){
                console.error(`Erro no listener de "${nome}":`, err);
            }
        })
    }
}

export const eventBus = new EventBus();