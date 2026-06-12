import { TransacaoRepository } from "../../../domain/repositories/transacao-repository";
import { CarteiraRepository } from "../../../domain/repositories/carteira-repository";
import { Transacao, Categorias, TipoTransacao } from "../../../domain/entities/transacao";
import { toTransacaoDto, TransacaoDto } from "../../dtos/transacao-dtos";
import { BusinessError } from "../../../domain/errors/business-error";

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

    const delta = req.tipo_transacao === TipoTransacao.CREDITO ? req.valor : -req.valor
    await this.carteiraRepository.incrementCacheWalletBalance(carteiraExistente.id, delta)

    return toTransacaoDto(transacaoCriada);
}
}