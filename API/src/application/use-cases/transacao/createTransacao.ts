import { TransacaoRepository } from "../../../domain/repositories/transacao-repository";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";
import { eventBus } from "../../../domain/events/event-bus"
import { Transacao, Categorias, TipoTransacao } from "../../../domain/entities/transacao";
import { toTransacaoDto, TransacaoDto } from "../../dtos/transacao-dtos";
import { BusinessError } from "../../../domain/errors/business-error";

import { TransacaoCriadaEvent } from "../../../domain/events/transacao-criada.event";

export interface CreateTransacaoRequest {
    nome: string;
    id_usuario: string;
    valor: number;
    categoria: Categorias
    tipo_transacao: TipoTransacao;
}

export class CreateTransacaoUseCase {
    constructor(private transacaoRepository: TransacaoRepository,
        private carteiraRepository: CarteiraRepository
    ) {}

    async create(req: CreateTransacaoRequest) : Promise<TransacaoDto> {
        const carteiraExistente = await this.carteiraRepository.getByUserId(req.id_usuario);
        if(!carteiraExistente) {
            throw new BusinessError("Carteira não encontrada", 404);
        }

    const transacao = Transacao.create({
        nome: req.nome,
        id_carteira: carteiraExistente.id,
        valor: req.valor,
        categoria: req.categoria,
        tipo_transacao: req.tipo_transacao
    });

    const transacaoCriada = await this.transacaoRepository.createTransacao(transacao);

    eventBus.publish(new TransacaoCriadaEvent(
        req.id_usuario,
        transacaoCriada.id,
        carteiraExistente.id,
        transacaoCriada.valor,
        transacaoCriada.nome,
        transacaoCriada.categoria,
        transacaoCriada.tipo_transacao,
    ))
    
    return toTransacaoDto(transacaoCriada);
}
}